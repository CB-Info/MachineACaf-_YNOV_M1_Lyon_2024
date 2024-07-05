import {HardwareInterface} from "../../src/hardware/hardware.interface";
import {Pièce} from "../../src/Pièce";
import {HardwareDummy} from "./HardwareDummy";
import { TypeDeCafé } from "../../src/TypeDeCafé";

export interface HardwareFakeInterface extends HardwareInterface {
    SimulerInsertionPièce(pièce: Pièce): void;
    CountInvocationsMakeACoffee(): number;
}

export class HardwareFake extends HardwareDummy {
    private _moneyInsertedCallback: (coinValue: number) => void = () => {};
    private _typeCoffeeCallback: (type: TypeDeCafé) => void = () => {}
    private _invocationsMakeACoffee: number = 0;

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
    public CountInvocationsMakeACoffee() : number {
        return this._invocationsMakeACoffee;
    }
}