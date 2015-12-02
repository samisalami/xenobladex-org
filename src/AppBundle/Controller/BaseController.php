<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class BaseController extends Controller
{
    /**
     * @Route("/", name="index")
     */
    public function indexAction()
    {
        return $this->render('@App/index.html.twig');
    }

    /**
     * @Route("/admin")
     */
    public function adminAction() {
        return $this->render('/#/admin');
    }

    /**
     * @Route("/admin/login")
     */
    public function loginAction() {
        return $this->redirect('/#/login-form');
    }
}
