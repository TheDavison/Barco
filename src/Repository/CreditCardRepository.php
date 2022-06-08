<?php

namespace App\Repository;

use App\Entity\CreditCard;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CreditCard>
 *
 * @method CreditCard|null find($id, $lockMode = null, $lockVersion = null)
 * @method CreditCard|null findOneBy(array $criteria, array $orderBy = null)
 * @method CreditCard[]    findAll()
 * @method CreditCard[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CreditCardRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CreditCard::class);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(CreditCard $entity, bool $flush = false): void
    {
        $this->_em->persist($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function remove(CreditCard $entity, bool $flush = false): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    public function findOneByNumber($number): ?CreditCard
   {
       return $this->createQueryBuilder('c')
           ->andWhere('c.creditNumber = :number')
           ->setParameter('number', $number)
           ->getQuery()
           ->getOneOrNullResult()
       ;
   }

    public function findOneByAllField($number, $holder, $expire, $cvv): ?CreditCard
    {
        return $this->createQueryBuilder('c')
        ->andWhere('c.creditNumber = :number')
        ->andWhere('c.cardHolder = :holder')
        ->andWhere('c.expirationDate = :expire')
        ->andWhere('c.cvv = :cvv')
        ->setParameter('number', $number)
        ->setParameter('holder', $holder)
        ->setParameter('expire', $expire)
        ->setParameter('cvv', $cvv)
        ->getQuery()
        ->getOneOrNullResult()
        ;
    }


//    /**
//     * @return CreditCard[] Returns an array of CreditCard objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?CreditCard
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
