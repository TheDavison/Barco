<?php

namespace App\Controller;

use App\Entity\CreditCard;
use App\Form\CreditCardType;
use App\Repository\CreditCardRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/credit/card')]
class CreditCardController extends AbstractController
{
    #[Route('/', name: 'app_credit_card_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $creditCards = $entityManager
            ->getRepository(CreditCard::class)
            ->findAll();

        return $this->render('credit_card/index.html.twig', [
            'credit_cards' => $creditCards,
        ]);
    }

    #[Route('/new', name: 'app_credit_card_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $creditCard = new CreditCard();
        $form = $this->createForm(CreditCardType::class, $creditCard);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($creditCard);
            $entityManager->flush();

            return $this->redirectToRoute('app_credit_card_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('credit_card/new.html.twig', [
            'credit_card' => $creditCard,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_credit_card_show', methods: ['GET'])]
    public function show(CreditCard $creditCard): Response
    {
        return $this->render('credit_card/show.html.twig', [
            'credit_card' => $creditCard,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_credit_card_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, CreditCard $creditCard, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(CreditCardType::class, $creditCard);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_credit_card_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('credit_card/edit.html.twig', [
            'credit_card' => $creditCard,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_credit_card_delete', methods: ['POST'])]
    public function delete(Request $request, CreditCard $creditCard, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$creditCard->getId(), $request->request->get('_token'))) {
            $entityManager->remove($creditCard);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_credit_card_index', [], Response::HTTP_SEE_OTHER);
    }
}
