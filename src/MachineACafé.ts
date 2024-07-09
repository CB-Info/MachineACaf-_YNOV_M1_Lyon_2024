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
    private waterStock = 10;

    private insérer(pièce: Pièce) {
        if(pièce.EstInférieureA(MachineACafé.PrixDuCafé)) return
        if (this.typeDeCafé == undefined) return

        this._hardware.MakeACoffee(this.typeDeCafé)
        this.argentEncaisséEnCentimes += pièce.getMontant()
    }

    private sélectionDuCafé(type: TypeDeCafé) {
        this.typeDeCafé = type
    }

    private vérificationStockEau(type: TypeDeCafé) {
        const waterNeeded = type === TypeDeCafé.NORMAL ? 1 : 2; // 1 dose pour un café normal, 2 pour un allongé
        if (this.TryPullWater(waterNeeded)) {
            if (this.PourWater(waterNeeded)) {
                this._hardware.MakeACoffee(type);
            } else {
                console.log("Erreur lors de l'ajout de l'eau.");
            }
        } else {
            console.log("Pas assez d'eau disponible pour préparer ce type de café.");
        }
    }

    private TryPullWater(amount: number): boolean {
        return this._hardware.TryPullWater(amount);
    }

    private PourWater(amount: number): boolean {
        return this._hardware.PourWater(amount);
    }
}