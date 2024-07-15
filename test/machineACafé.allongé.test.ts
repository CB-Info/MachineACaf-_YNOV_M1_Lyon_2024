import {Pièce} from "../src/Pièce";
import { TypeDeCafé } from "../src/TypeDeCafé";
import "./utilities/HardwareMatchers"
import {MachineACaféBuilder} from "./utilities/MachineACaféBuilder";

describe("Café normal ou allongé", () => {
    test.each([
        TypeDeCafé.NORMAL,
        TypeDeCafé.ALLONGE
    ])
    ("Cas café %s", (type: TypeDeCafé) => {
        // ETANT DONNE une machine a café
        let machineACafé = MachineACaféBuilder.ParDéfaut()

        // ET que je choisis un café allongé
        machineACafé.SimulerSélectionCafé(type)
        
        // QUAND on insère 50cts, 1 fois
        machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes)

        // ALORS il a été demandé au hardware de servir un café allongé
        expect(machineACafé).unCaféEstServi();

        // ET le café de type allongé a été servi
        expect(machineACafé.typeDeCafé).toEqual(type);

        // ET l'argent est encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(50);
    })
})