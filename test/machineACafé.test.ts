import {Pièce} from "../src/Pièce";
import { TypeDeCafé } from "../src/TypeDeCafé";
import "./utilities/HardwareMatchers"
import {MachineACaféBuilder} from "./utilities/MachineACaféBuilder";

describe("MVP", () => {
    test("Cas 2 cafés", () => {
        // ETANT DONNE une machine a café
        let machineACafé = MachineACaféBuilder.ParDéfaut()

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

        // QUAND on choisis le café normal
        machineACafé.SimulerSélectionCafé(TypeDeCafé.NORMAL)

        // QUAND on insère la pièce
        machineACafé.SimulerInsertionPièce(pièce)

        // ALORS il a été demandé au hardware de servir un café
        expect(machineACafé).unCaféEstServi();

        // ET l'argent est encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(pièce.getMontant());
    })
})