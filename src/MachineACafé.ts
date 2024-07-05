import {Pièce} from "./Pièce";
import { TypeDeCafé } from "./TypeDeCafé";
import {HardwareInterface} from "./hardware/hardware.interface";

export class MachineACafé {
    private readonly _hardware: HardwareInterface;

    constructor(hardware: HardwareInterface) {
        hardware.RegisterTypeOfCoffeeCallback((type: TypeDeCafé) => {
            this.sélectionDuCafé(type)
        })
        hardware.RegisterMoneyInsertedCallback((montant: number) => {
            this.insérer(Pièce.Parse(montant))
        })

        this._hardware = hardware
    }

    private static readonly PrixDuCafé = Pièce.CinquanteCentimes;

    argentEncaisséEnCentimes: number = 0;
    typeDeCafé?: TypeDeCafé = undefined;

    private insérer(pièce: Pièce) {
        if(pièce.EstInférieureA(MachineACafé.PrixDuCafé)) return
        if (this.typeDeCafé == undefined) return

        this._hardware.MakeACoffee(this.typeDeCafé)
        this.argentEncaisséEnCentimes += pièce.getMontant()
    }

    private sélectionDuCafé(type: TypeDeCafé) {
        this.typeDeCafé = type
    }
}