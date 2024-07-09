import {Pièce} from "../src/Pièce";
import { TypeDeCafé } from "../src/TypeDeCafé";
import "./utilities/HardwareMatchers"
import {MachineACaféBuilder} from "./utilities/MachineACaféBuilder";

describe("MVP", () => {
    test("Cas 2 cafés", () => {
        // ETANT DONNE une machine a café
        let machineACafé = MachineACaféBuilder.ParDéfaut()

        machineACafé.avecStockEauAjusté(10);

        // QUAND on choisis le café normal
        machineACafé.SimulerSélectionCafé(TypeDeCafé.NORMAL)
        machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes)
        machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes)

        // ALORS il a été demandé au hardware de servir deux cafés
        expect(machineACafé).xCafésSontServis(2);

        // ET l'argent est encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(100);
    })

    test.each([
        Pièce.UnCentime,
        Pièce.DeuxCentimes,
        Pièce.CinqCentimes,
        Pièce.DixCentimes,
        Pièce.VingtCentimes,
    ])
    ("Cas pas assez argent : %s", (pièce: Pièce) => {
        // ETANT DONNE une machine a café
        // ET une pièce d'une valeur inférieure 50cts
        let machineACafé = MachineACaféBuilder.ParDéfaut()

        machineACafé.avecStockEauAjusté(10);

        // QUAND on choisis le café normal
        machineACafé.SimulerSélectionCafé(TypeDeCafé.NORMAL)
        // QUAND on insère la pièce
        machineACafé.SimulerInsertionPièce(pièce)

        // ALORS il n'a pas été demandé au hardware de servir un café
        expect(machineACafé).aucunCaféNEstServi();

        // ET l'argent n'est pas encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(0);
    })

    test.each([
        Pièce.CinquanteCentimes,
        Pièce.UnEuro,
        Pièce.DeuxEuros,
    ])
    ("Cas nominal : %s", (pièce: Pièce) => {
        // ETANT DONNE une machine a café
        // ET une pièce d'une valeur supérieure à 50cts
        let machineACafé = MachineACaféBuilder.ParDéfaut()

        machineACafé.avecStockEauAjusté(10);

        // QUAND on choisis le café normal
        machineACafé.SimulerSélectionCafé(TypeDeCafé.NORMAL)

        // QUAND on insère la pièce
        machineACafé.SimulerInsertionPièce(pièce)

        // ALORS il a été demandé au hardware de servir un café
        expect(machineACafé).unCaféEstServi();

        // ET l'argent est encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(pièce.getMontant());
    })

    test.each([
        TypeDeCafé.NORMAL,
        TypeDeCafé.ALLONGE
    ])
    ("Cas café %s", (type: TypeDeCafé) => {
        // ETANT DONNE une machine a café
        let machineACafé = MachineACaféBuilder.ParDéfaut()

        machineACafé.avecStockEauAjusté(10);

        // ET que je choisis un café allongé
        machineACafé.SimulerSélectionCafé(type)
        
        // ALORS on vérifie le stock d'eau

        // QUAND on insère 50cts, 1 fois
        machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes)

        // ALORS il a été demandé au hardware de servir un café allongé
        expect(machineACafé).unCaféEstServi();

        // ET le café de type allongé a été servi
        expect(machineACafé.typeDeCafé).toEqual(type);

        // ET l'argent est encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(50);
    })

    test.each([
        [TypeDeCafé.NORMAL, 1],
        [TypeDeCafé.ALLONGE, 2]
    ])
    ("Cas café %s avec vérification de stock d'eau", (type: TypeDeCafé, amount: number) => {
        // ETANT DONNE une machine à café avec suffisamment d'eau pour un type de café
        let machineACafé = MachineACaféBuilder.ParDéfaut()
        machineACafé.avecStockEauAjusté(10);

        // QUAND on choisis un type de café
        machineACafé.SimulerSélectionCafé(type)

        // ET QUAND on insère 50cts
        machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes)

        // ALORS il a été demandé au hardware de servir le type de café sélectionné
        expect(machineACafé).unCaféEstServi();

        // ET le type de café servi correspond à la sélection
        expect(machineACafé.typeDeCafé).toEqual(type);

        // ET l'argent est encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(50);
        expect(machineACafé.CountWaterStock()).toEqual(10 - amount)
    })

    test("Cas café allongé avec 1 dose d'eau", () => {
        // ETANT DONNE une machine à café avec 1 dose d'eau pour un café allongé
        let machineACafé = MachineACaféBuilder.ParDéfaut()

        machineACafé.avecStockEauAjusté(1);

        // QUAND on choisis un café allongé
        machineACafé.SimulerSélectionCafé(TypeDeCafé.ALLONGE)

        // ET QUAND on insère 50cts
        machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes)

        // ALORS il a été demandé au hardware de servir un café normal à la place
        expect(machineACafé).unCaféEstServi();

        // ET le type de café servi est un café normal
        expect(machineACafé.typeDeCafé).not.toEqual(TypeDeCafé.NORMAL);

        // ET l'argent est encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(50);
        expect(machineACafé.CountWaterStock()).toEqual(1 - 1)
    })

    test("Cas café quand il n'y pas d'eau", () => {
        // ETANT DONNE une machine à café avec suffisamment d'eau pour un type de café
        let machineACafé = MachineACaféBuilder.ParDéfaut()
        machineACafé.avecStockEauAjusté(0);

        // QUAND on choisis un type de café
        machineACafé.SimulerSélectionCafé(TypeDeCafé.NORMAL)


        // ET QUAND on insère 50cts
        machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes)

        // ALORS il a été demandé au hardware de servir le type de café sélectionné
        expect(machineACafé).aucunCaféNEstServi;

        // ET le type de café servi correspond à la sélection
        expect(machineACafé.typeDeCafé).toEqual(TypeDeCafé.NORMAL);

        // ET l'argent est encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(0);
        expect(machineACafé.CountWaterStock()).toEqual(0)
    })
})