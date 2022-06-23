<?php

namespace App\Controller;

use App\Entity\Bookings;
use App\Repository\BookingsRepository;

use App\Entity\Turns;
use App\Repository\TurnsRepository;

use DateTime;
use App\Form\BookingsType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/bookings')]
class BookingsController extends AbstractController
{
    #[Route('/', name: 'app_bookings_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $bookings = $entityManager
            ->getRepository(Bookings::class)
            ->findAll();

        return $this->render('bookings/index.html.twig', [
            'bookings' => $bookings,
        ]);
    }
    #[Route('/list', name: 'list_bookings', methods: ['GET'])]
    public function list(BookingsRepository $bookingsRepository): Response
    {
        $reservas = $bookingsRepository ->findAll();
        
        $arrayReservas = [];

        foreach ($reservas as $reserva) {
            $arrayReservas [$reserva->getId()]['id'] = $reserva->getId();
            $arrayReservas [$reserva->getId()]['booker'] = $reserva->getBooker()->getUsername();
            $arrayReservas [$reserva->getId()]['turn'] = $reserva->getTurn()->getHour();
            $arrayReservas [$reserva->getId()]['date'] = $reserva->getDate()->format("d/m/Y");
        }


        return $this->json([
            'success' => true,
            'data' => $arrayReservas,
        ]);
    }
    #[Route('/new', name: 'app_bookings_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager, TurnsRepository $turnsRepository, BookingsRepository $bookingsRepository): Response
    {
        $data = json_decode($request->getContent(), true);
        $lastTurnADay = 120;
        $turno = 0;
        $reservas = 0;
        
        while($reservas < $data['groupSize']){
            //Id del turno que se intenta Reservar
            $reservarEsteTurno = (int)(((int) $data['primerTurno']+$turno)%$lastTurnADay);
            //Variable si no hay turnos durante el dia que que se ha elegido;
            $reservarEnEsteDia = (int)(((int) $data['primerTurno']+$turno)/$lastTurnADay);

            //Creación de la fecha correcta
            $fecha = new DateTime($data['fecha']);
            $fecha -> modify('+'.$reservarEnEsteDia.' day');
            
            //Array de los ids de los turnos del día que han sido reservados
            $booking = $bookingsRepository -> findByDate($data['fecha']);
            $bookedTurns = [];
    
            foreach($booking as $book){
                array_push($bookedTurns, $book -> getTurn() -> getId());
            }


            //Compruebo si el turno está reservado
            if(!in_array($reservarEsteTurno, $bookedTurns)){
            
                $newBooking = new Bookings();

                $newBooking -> setBooker($this->getUser());

                $newBooking -> setDate($fecha);

                $newBooking -> setTurn($turnsRepository -> findOneById($reservarEsteTurno));

                $entityManager->persist($newBooking);
                $entityManager->flush();
                $reservas++;
            }
            $turno++;
        }

        return $this->json(Response::HTTP_OK);
    }

    #[Route('/{id}', name: 'app_bookings_show', methods: ['GET'])]
    public function show(Bookings $booking): Response
    {
        return $this->render('bookings/show.html.twig', [
            'booking' => $booking,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_bookings_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Bookings $booking, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(BookingsType::class, $booking);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_bookings_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('bookings/edit.html.twig', [
            'booking' => $booking,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_bookings_delete', methods: ['POST'])]
    public function delete(Request $request, Bookings $booking, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$booking->getId(), $request->request->get('_token'))) {
            $entityManager->remove($booking);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_bookings_index', [], Response::HTTP_SEE_OTHER);
    }
}
