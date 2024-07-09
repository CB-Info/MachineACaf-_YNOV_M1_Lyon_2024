import {HardwareInterface} from "../../src/hardware/hardware.interface";
import {Pièce} from "../../src/Pièce";
import {HardwareDummy} from "./HardwareDummy";
import { TypeDeCafé } from "../../src/TypeDeCafé";

export interface HardwareFakeInterface extends HardwareInterface {
    SimulerInsertionPièce(pièce: Pièce): void;
    CountInvocationsMakeACoffee(): number;
    SimulerSélectionCafé(type: TypeDeCafé): void;
    VérifierStockEau(type: TypeDeCafé): boolean;
    avecStockEauAjusté(type: TypeDeCafé): void;
    avecStockEauSuffisant(): void;
}

export class HardwareFake extends HardwareDummy {
    private _moneyInsertedCallback: (coinValue: number) => void = () => {};
    private _typeCoffeeCallback: (type: TypeDeCafé) => void = () => {}
    private _invocationsMakeACoffee: number = 0;
    private _waterStock = 10;

    TryPullWater(amount: number): boolean {
        if (this._waterStock >= amount) {
            this._waterStock -= amount;
            return true;
        } else {
            return false;
        }
    }

    PourWater(amount: number): boolean {
        if (amount > 0) { // Simule l'ajout d'eau dans le système
            console.log(`Ajout de ${amount} dose(s) d'eau.`);
            return true;
        } else {
            return false;
        }
    }

    MakeACoffee(): boolean {
        this._invocationsMakeACoffee ++;
        return true;
    }

    RegisterMoneyInsertedCallback(callback: (coinValue: number) => void): void {
        this._moneyInsertedCallback = callback;
    }

    RegisterTypeOfCoffeeCallback(callback: (type: TypeDeCafé) => void): void {
        this._typeCoffeeCallback = callback;
    }

    public SimulerInsertionPièce(pièce: Pièce): void {
        this._moneyInsertedCallback(pièce.getMontant())
    }

    public SimulerSélectionCafé(type: TypeDeCafé): void {
        this._typeCoffeeCallback(type)
    }

    public VérifierStockEau(type: TypeDeCafé): boolean {
        const waterNeeded = type === TypeDeCafé.NORMAL ? 1 : 2;
        return this._waterStock >= waterNeeded;
    }

    public CountInvocationsMakeACoffee() : number {
        return this._invocationsMakeACoffee;
    }
}