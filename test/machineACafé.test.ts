import {MachineACafé} from "../src/MachineACafé";
import {Pièce} from "../src/Pièce";
import { TypeDeCafé } from "../src/TypeDeCafé";
import {HardwareFake} from "./utilities/HardwareFake";
import "./utilities/HardwareMatchers"

describe("MVP", () => {
    test("Cas 2 cafés", () => {
        // ETANT DONNE une machine a café
        let hardware = new HardwareFake()
        let machineACafé = new MachineACafé(hardware)

        // QUAND on choisis le café normal
        // ET on insère 50cts, 2 fois
        hardware.SimulerSélectionCafé(TypeDeCafé.NORMAL)
        hardware.SimulerInsertionPièce(Pièce.CinquanteCentimes)
        hardware.SimulerInsertionPièce(Pièce.CinquanteCentimes)

        // ALORS il a été demandé au hardware de servir deux cafés
        expect(hardware).xCafésSontServis(2);

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
        let hardware = new HardwareFake()
        let machineACafé = new MachineACafé(hardware)

        // QUAND on choisis le café normal
        // ET on insère la pièce
        hardware.SimulerSélectionCafé(TypeDeCafé.NORMAL)
        hardware.SimulerInsertionPièce(pièce)

        // ALORS il n'a pas été demandé au hardware de servir un café
        expect(hardware).aucunCaféNEstServi();

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
        let hardware = new HardwareFake()
        let machineACafé = new MachineACafé(hardware)

        // QUAND on choisis le café normal
        // ET on insère la pièce
        hardware.SimulerSélectionCafé(TypeDeCafé.NORMAL)
        hardware.SimulerInsertionPièce(pièce)

        // ALORS il a été demandé au hardware de servir un café
        expect(hardware).unCaféEstServi();

        // ET l'argent est encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(pièce.getMontant());
    })

    test("Cas café allongé", () => {
        // ETANT DONNE une machine a café
        let hardware = new HardwareFake()
        let machineACafé = new MachineACafé(hardware)

        // QUAND on insère 50cts, 1 fois
        // ET que je choisis un café allongé
        hardware.SimulerSélectionCafé(TypeDeCafé.ALLONGE)
        hardware.SimulerInsertionPièce(Pièce.CinquanteCentimes)

        // ALORS il a été demandé au hardware de servir un café allongé
        expect(hardware).unCaféEstServi();

        // ET le café de type allongé a été servi
        expect(machineACafé.typeDeCafé).toEqual(TypeDeCafé.ALLONGE);
    })
})