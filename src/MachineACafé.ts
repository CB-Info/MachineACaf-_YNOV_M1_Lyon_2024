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
            //this._hardware.SetLedState(false);
        } else {
            console.log("Impossible de préparer le café, pas assez d'eau.");
        }
    }

    private sélectionDuCafé(type: TypeDeCafé) {
        this.typeDeCafé = type
    }

    private vérificationStockEau(type: TypeDeCafé): boolean {
        const waterNeeded = type === TypeDeCafé.NORMAL ? 1 : 2; // 1 dose pour un café normal, 2 pour un allongé
        if (this._hardware.TryPullWater(waterNeeded)) {
            this._hardware.PourWater(waterNeeded);
            return true;
        } else if (type === TypeDeCafé.ALLONGE && this._hardware.TryPullWater(1)) {
            // Activation de la LED pour signaler un changement de type de café
            this._hardware.SetLedState(true);
            this.typeDeCafé = TypeDeCafé.NORMAL; // Changement de type de café en normal
            this._hardware.PourWater(1);
            return true;
        } else {
            this._hardware.SetLedState(false); // S'assurer que la LED est éteinte
            console.log("Pas assez d'eau disponible pour préparer ce type de café.");
            return false;
        }
    }
}