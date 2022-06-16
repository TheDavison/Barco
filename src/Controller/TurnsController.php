<?php

namespace App\Controller;

use App\Entity\Turns;
use App\Form\TurnsType;
use App\Repository\TurnsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/turns')]
class TurnsController extends AbstractController
{
    #[Route('/list', name: 'app_turns_index', methods: ['GET'])]
    public function list(TurnsRepository $turnsRepository): Response
    {
        $turns = $turnsRepository -> findAll();

        return $this->json([
            'success' => true,
            'data' => $turns,
        ]);
    }

    // #[Route('/new', name: 'app_turns_new', methods: ['GET', 'POST'])]
    // public function new(Request $request, EntityManagerInterface $entityManager): Response
    // {
    //     $turn = new Turns();
    //     $form = $this->createForm(TurnsType::class, $turn);
    //     $form->handleRequest($request);

    //     if ($form->isSubmitted() && $form->isValid()) {
    //         $entityManager->persist($turn);
    //         $entityManager->flush();

    //         return $this->redirectToRoute('app_turns_index', [], Response::HTTP_SEE_OTHER);
    //     }

    //     return $this->renderForm('turns/new.html.twig', [
    //         'turn' => $turn,
    //         'form' => $form,
    //     ]);
    // }

    // #[Route('/{id}', name: 'app_turns_show', methods: ['GET'])]
    // public function show(Turns $turn): Response
    // {
    //     return $this->render('turns/show.html.twig', [
    //         'turn' => $turn,
    //     ]);
    // }

    // #[Route('/{id}/edit', name: 'app_turns_edit', methods: ['GET', 'POST'])]
    // public function edit(Request $request, Turns $turn, EntityManagerInterface $entityManager): Response
    // {
    //     $form = $this->createForm(TurnsType::class, $turn);
    //     $form->handleRequest($request);

    //     if ($form->isSubmitted() && $form->isValid()) {
    //         $entityManager->flush();

    //         return $this->redirectToRoute('app_turns_index', [], Response::HTTP_SEE_OTHER);
    //     }

    //     return $this->renderForm('turns/edit.html.twig', [
    //         'turn' => $turn,
    //         'form' => $form,
    //     ]);
    // }

    // #[Route('/{id}', name: 'app_turns_delete', methods: ['POST'])]
    // public function delete(Request $request, Turns $turn, EntityManagerInterface $entityManager): Response
    // {
    //     if ($this->isCsrfTokenValid('delete'.$turn->getId(), $request->request->get('_token'))) {
    //         $entityManager->remove($turn);
    //         $entityManager->flush();
    //     }

    //     return $this->redirectToRoute('app_turns_index', [], Response::HTTP_SEE_OTHER);
    // }
}
