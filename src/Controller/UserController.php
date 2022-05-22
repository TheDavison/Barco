<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/user')]
class UserController extends AbstractController
{
    #[Route('/', name: 'app_user_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $users = $entityManager
            ->getRepository(User::class)
            ->findAll();

        return $this->render('user/index.html.twig', [
            'users' => $users,
        ]);
    }

    #[Route('/list', name: 'list_users', methods: ['GET'])]
    public function list(UserRepository $userRepository): Response
    {
        $users = $userRepository ->findAll();
        
        $arrayUsers = [];

        foreach ($users as $user) {
            $arrayUsers [$user->getId()]['id'] = $user->getId();
            $arrayUsers [$user->getId()]['username'] = $user->getUsername();
            $arrayUsers [$user->getId()]['password'] = $user->getPassword();
            $arrayUsers [$user->getId()]['roles'] = $user->getRoles();
            $arrayUsers [$user->getId()]['donations'] = $user->getDonations();
        }


        return $this->json([
            'success' => true,
            'data' => $arrayUsers,
        ]);
    }

    // #[Route('/new', name: 'app_user_new', methods: ['GET', 'POST'])]
    // public function new(Request $request, EntityManager $entityManager): Response
    // {
    //     $user = new User();
    //     $form = $this->createForm(UserType::class, $user);
    //     $form->handleRequest($request);

    //     if ($form->isSubmitted() && $form->isValid()) {
    //         $entityManager->persist($user);
    //         $entityManager->flush();

    //         return $this->redirectToRoute('app_user_index', [], Response::HTTP_SEE_OTHER);
    //     }

    //     return $this->renderForm('user/new.html.twig', [
    //         'user' => $user,
    //         'form' => $form,
    //     ]);
    // }

    #[Route('/new', name: 'app_user_new', methods: ['GET', 'POST'])]
    public function new(Request $request, UserRepository $userRepository, UserPasswordHasherInterface $userPasswordHasher,  EntityManagerInterface $entityManager)
    {
        
        // $prueba = new User();   
        $data = json_decode($request->getContent(), true);
        
        if(!$userRepository -> findOneByUsername($data['username'])){
            $newUser = new User();
            $newUser -> setUsername($data['username']);
    
            $newUser -> setPassword(
                $userPasswordHasher->hashPassword(
                    $newUser,
                        $data['password'],
                    )
                );
        
            $entityManager->persist($newUser);
            $entityManager->flush();
        }
        
        // return $this->json([
        //     'success' => true,
        //     'data' => $data,
        // ]);

        // return $this->redirectToRoute("/login");

        // return $this->renderForm('user/new.html.twig', [
        //     'user' => $user,
        //     'form' => $form,
        // ]);
    }


    #[Route('/{id}', name: 'app_user_show', methods: ['GET'])]
    public function show(User $user): Response
    {
        return $this->render('user/show.html.twig', [
            'user' => $user,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_user_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, User $user, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_user_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('user/edit.html.twig', [
            'user' => $user,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_user_delete', methods: ['POST'])]
    public function delete(Request $request, User $user, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$user->getId(), $request->request->get('_token'))) {
            $entityManager->remove($user);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_user_index', [], Response::HTTP_SEE_OTHER);
    }
}
