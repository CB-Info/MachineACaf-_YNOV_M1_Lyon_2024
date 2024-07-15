import {Pièce} from "../src/Pièce";
import { TypeDeCafé } from "../src/TypeDeCafé";
import "./utilities/HardwareMatchers"
import {MachineACaféBuilder} from "./utilities/MachineACaféBuilder";

describe("Vérification stock d'eau", () => {
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

        // ET la led reste éteinte
        expect(machineACafé.CountInvocationsLedEtat()).toEqual(0);

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
        expect(machineACafé.typeDeCafé).toEqual(TypeDeCafé.NORMAL);

        // ET la led a été allumé puis éteinte
        expect(machineACafé.CountInvocationsLedEtat()).toEqual(2);

        // ET l'argent est encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(50);

        // ET le stock d'eau a été décrémenté
        expect(machineACafé.CountWaterStock()).toEqual(0)
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
        expect(machineACafé).aucunCaféNEstServi();

        // ET le type de café servi correspond à la sélection
        expect(machineACafé.typeDeCafé).toEqual(TypeDeCafé.NORMAL);

        // ET la led reste éteinte
        expect(machineACafé.CountInvocationsLedEtat()).toEqual(0);

        // ET l'argent est encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(0);
        expect(machineACafé.CountWaterStock()).toEqual(0)
    })
})