import { Pièce } from "../../src/Pièce";
import { TypeDeCafé } from "../../src/TypeDeCafé";
import { ButtonCodes, CoinCodes} from "../../src/hardware/hardware.interface";
import {HardwareFakeInterface} from "./HardwareFake";

export class HardwareDummy implements HardwareFakeInterface {
    SimulerSélectionCafé(type: TypeDeCafé): void {
        throw new Error("Method not implemented.");
    }
    RegisterTypeOfCoffeeCallback(callback: (type: TypeDeCafé) => void): void {
        throw new Error("Method not implemented.");
    }
    DropCashback(coin_code: CoinCodes): boolean {
        throw new Error("Method not implemented.");
    }
    PourChocolate(): boolean {
        throw new Error("Method not implemented.");
    }
    SimulerInsertionPièce(pièce: Pièce): void {
        throw new Error("Method not implemented.");
    }
    CountInvocationsMakeACoffee(): number {
        throw new Error("Method not implemented.");
    }
    RegisterMoneyInsertedCallback(callback: (coinValue: CoinCodes) => void): void {
        throw new Error("Method not implemented.");
    }
    FlushStoredMoney(): void {
        throw new Error("Method not implemented.");
    }
    CollectStoredMoney(): void {
        throw new Error("Method not implemented.");
    }
    IsCupPresent(): boolean {
        throw new Error("Method not implemented.");
    }
    ProvideCup(): void {
        throw new Error("Method not implemented.");
    }
    RegisterButtonPressedCallback(callback: (buttonCode: ButtonCodes) => void): void {
        throw new Error("Method not implemented.");
    }
    SetLungoWarningLedState(state: boolean): void {
        throw new Error("Method not implemented.");
    }
    MakeACoffee(): boolean {
        throw new Error("Method not implemented.");
    }
    TryPullWater(): boolean {
        throw new Error("Method not implemented.");
    }
    PourMilk(): boolean {
        throw new Error("Method not implemented.");
    }
    PourWater(): boolean {
        throw new Error("Method not implemented.");
    }
    PourSugar(): boolean {
        throw new Error("Method not implemented.");
    }
    VérifierStockEau(type: TypeDeCafé): boolean {
        return true
    }
}