import {MachineACafé} from "../../src/MachineACafé";
import {Pièce} from "../../src/Pièce";
import {HardwareFakeInterface} from "./HardwareFake";
import { TypeDeCafé } from "../../src/TypeDeCafé";

export class MachineACaféHarness extends MachineACafé {
    private hardware: HardwareFakeInterface;

    public constructor(hardware: HardwareFakeInterface) {
        super(hardware);
        this.hardware = hardware;
    }

    public SimulerInsertionPièce(pièce: Pièce) : void{
        this.hardware.SimulerInsertionPièce(pièce)
    }

    public SimulerSélectionCafé(type: TypeDeCafé) : void{
        this.hardware.SimulerSélectionCafé(type)
    }

    // Configure le stock d'eau ajusté selon le type  de café
    public avecStockEauAjusté(amount: number) {
        this.hardware.avecStockEauAjusté(amount);
    }

    public CountInvocationsMakeACoffee() {
        return this.hardware.CountInvocationsMakeACoffee();
    }

    public CountInvocationsLedEtat() {
        return this.hardware.CountInvocationsLedEtat();
    }

    public CountWaterStock(): number {
        return this.hardware.CountWaterStock();
    }

    public TryPullWater(amount: number) {
        this.hardware.TryPullWater(amount);
    }

    public PourWater(amount: number) {
        this.hardware.PourWater(amount);
    }
    
    public SetLedState(state: boolean): void {
        this.hardware.SetLedState(state);
    }

    public LedEtat(): boolean {
        return this.hardware.LedEtat()
    }
}