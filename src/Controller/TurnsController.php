<?php

namespace App\Controller;

use App\Entity\Turns;
use App\Repository\TurnsRepository;
use App\Form\TurnsType;
use App\Entity\Bookings;
use App\Repository\BookingsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/turns')]
class TurnsController extends AbstractController
{
    #[Route('/list', name: 'app_turns_index', methods: ['GET', 'POST'])]
    public function list(Request $request, TurnsRepository $turnsRepository, BookingsRepository $bookingsRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        $turns = $turnsRepository -> findAll();
        $booking = $bookingsRepository -> findByDate($data['fecha']);
        $returnTurns = [];
        $bookedTurns = [];

        foreach($booking as $book){
            array_push($bookedTurns, $book -> getTurn() -> getId());
        }

        foreach($turns as $turn){
            $returnTurns[$turn -> getId()]['id'] = $turn -> getId();
            $returnTurns[$turn -> getId()]['hour'] = $turn -> getHour();

            if(in_array($turn -> getId(), $bookedTurns)){
                $returnTurns[$turn -> getId()]['booked'] = true;
            }else{
                $returnTurns[$turn -> getId()]['booked'] = false;
            }
        }

        return $this->json([
            'success' => true,
            'data' => $returnTurns,
        ], Response::HTTP_OK);
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
