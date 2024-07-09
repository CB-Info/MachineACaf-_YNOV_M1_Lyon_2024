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
        if (pièce.EstInférieureA(MachineACafé.PrixDuCafé)) return
        if (this.typeDeCafé == undefined) return

        if (this.vérificationStockEau(this.typeDeCafé)) {
            this._hardware.MakeACoffee(this.typeDeCafé)
            this.argentEncaisséEnCentimes += pièce.getMontant()
        } else {
            console.log("Impossible de préparer le café, pas assez d'eau.");
        }
    }

    private sélectionDuCafé(type: TypeDeCafé) {
        this.typeDeCafé = type
    }

    private vérificationStockEau(type: TypeDeCafé): boolean {
        const waterNeeded = type === TypeDeCafé.NORMAL ? 1 : 2; // 1 dose pour un café normal, 2 pour un allongé
        return this._hardware.TryPullWater(waterNeeded) && this._hardware.PourWater(waterNeeded);
    }
}