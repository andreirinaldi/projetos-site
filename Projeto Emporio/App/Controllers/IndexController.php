<?php

namespace App\Controllers;

//os recursos do miniframework
use MF\Controller\Action;
use MF\Model\Container;

class IndexController extends Action {

	public function index() {

		$this->render('index');
	}

	public function entrar() {
		
		$this->view->login = isset($_GET['login']) ? $_GET['login'] : '';

		$this->view->erroCadastro = false;

		$this->render('entrar');
	}

	public function inscreverse() {

		$this->view->usuario = array(
				'nome' => '',
				'sobrenome' => '',
				'email' => '',
				'celular' => '',
				'senha' => '',
			);

		$this->view->erroCadastro = false;

		$this->render('inscreverse');
	}

	public function registrar() {

		$usuario = Container::getModel('Usuario');

		$usuario->__set('nome', $_POST['nome']);
		$usuario->__set('sobrenome', $_POST['sobrenome']);
		$usuario->__set('email', $_POST['email']);
		$usuario->__set('celular', $_POST['celular']);
		$usuario->__set('senha', md5($_POST['senha']));

		
		if($usuario->validarCadastro() && count($usuario->getUsuarioPorEmail()) == 0) {
		
				$usuario->salvar();

				$this->render('cadastro'); // view do cadastro realizado com sucesso

		} else {

			$this->view->usuario = array(
				'nome' => $_POST['nome'],
				'sobrenome' => $_POST['sobrenome'],
				'email' => $_POST['email'],
				'celular' => $_POST['celular'],
				'senha' => $_POST['senha'],
			);

			$this->view->erroCadastro = true;

			$this->render('inscreverse'); // view da página de cadastro
		}

	}

}


?>