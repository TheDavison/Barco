<?php

namespace App\Controller;

use App\Entity\Donation;
use App\Form\DonationType;
use App\Repository\DonationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use DateTime;
use App\Entity\CreditCard;
use App\Repository\CreditCardRepository;
use App\Entity\User;
use App\Repository\UserRepository;

#[Route('/donation')]
class DonationController extends AbstractController
{
    #[Route('/', name: 'app_donation_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $donations = $entityManager
            ->getRepository(Donation::class)
            ->findAll();

        return $this->render('donation/index.html.twig', [
            'donations' => $donations,
        ]);
    }

    #[Route('/list', name: 'list_donations', methods: ['GET'])]
    public function list(DonationRepository $donationRepository): Response
    {
        $donations = $donationRepository ->findAll();
        
        $arrayDonations = [];

        foreach ($donations as $donation) {
            $arrayDonations [$donation->getId()]['id'] = $donation->getId();
            $arrayDonations [$donation->getId()]['donator'] = $donation->getDonator()->getUsername();
            $arrayDonations [$donation->getId()]['quantity'] = $donation->getQuantity();
            $arrayDonations [$donation->getId()]['date'] = $donation->getDate()->format("d/m/Y - H:i");
        }


        return $this->json([
            'success' => true,
            'data' => $arrayDonations,
        ]);
    }

    #[Route('/getTop', name: 'top_donators', methods: ['GET'])]
    public function getTop(DonationRepository $donationRepository): Response
    {
        $donations = $donationRepository ->findByTopDonators();
        
        $arrayDonations = [];

        for($i = 0; $i < count($donations); $i++){
            $arrayDonations [$i]['id'] = $donations[$i]["id"];
            $arrayDonations [$i]['donator'] = $donations[$i]["donator"];
            $arrayDonations [$i]['quantity'] = $donations[$i]["quantity"];
        }


        return $this->json([
            'success' => true,
            'data' => $arrayDonations,
        ]);
    }

    #[Route('/new', name: 'app_donation_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager, DonationRepository $donationRepository, CreditCardRepository $creditCardRepository, UserRepository $userRepository)
    {
        $data = json_decode($request->getContent(), true);

        $donation = new Donation();
        $creditCard;
        $nuevaCreditCard = false;

        if($creditCardRepository -> findOneByAllField($data['cardNumber'], $data['cardHolder'], $data['cardDate'], $data['cardCVV'])){
            $donation -> setCreditCard($creditCardRepository -> findOneByAllField($data['cardNumber'], $data['cardHolder'], $data['cardDate'], $data['cardCVV']));
        }else{
            $nuevaCreditCard = true;
            $creditCard = new CreditCard();
            
            $creditCard -> setCreditNumber($data['cardNumber']);
            $creditCard -> setCardHolder($data['cardHolder']);
            $creditCard -> setExpirationDate($data['cardDate']);
            $creditCard -> setCvv($data['cardCVV']);
            
            $donation -> setCreditCard($creditCard);
            
        }

        $donation -> setDonator($this->getUser());
        
        $donation -> setQuantity($data['quantity']);
        $fecha = new DateTime();
        $donation -> setDate($fecha);
        $donation -> setDiscordUsername($data['discordUsername']);
        $donation -> setType($data['type']);
        
        if($nuevaCreditCard){
            $entityManager->persist($creditCard);
        }
        $entityManager->persist($donation);
        $entityManager->flush();

        return $this->json(Response::HTTP_OK);
    }

    #[Route('/{id}', name: 'app_donation_show', methods: ['GET'])]
    public function show(Donation $donation): Response
    {
        return $this->render('donation/show.html.twig', [
            'donation' => $donation,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_donation_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Donation $donation, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(DonationType::class, $donation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_donation_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('donation/edit.html.twig', [
            'donation' => $donation,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_donation_delete', methods: ['POST'])]
    public function delete(Request $request, Donation $donation, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$donation->getId(), $request->request->get('_token'))) {
            $entityManager->remove($donation);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_donation_index', [], Response::HTTP_SEE_OTHER);
    }
}
