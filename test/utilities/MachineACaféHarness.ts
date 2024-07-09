import {MachineACafé} from "../../src/MachineACafé";
import {Pièce} from "../../src/Pièce";
import {HardwareFakeInterface} from "./HardwareFake";
import {HardwareFake} from "./HardwareFake";
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

    public VérifierStockEau(type: TypeDeCafé) : void{
        this.hardware.VérifierStockEau(type)
    }

    // Configure le stock d'eau pour être suffisant pour n'importe quel type de café
    public avecStockEauSuffisant() {
        this.hardware.avecStockEauSuffisant();
    }

    // Configure le stock d'eau ajusté selon le type  de café
    public avecStockEauAjusté(type: TypeDeCafé) {
        this.hardware.avecStockEauAjusté(type);

    }

    public CountInvocationsMakeACoffee() {
        return this.hardware.CountInvocationsMakeACoffee();
    }
}