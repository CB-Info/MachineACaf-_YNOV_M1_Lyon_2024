import { MachineACaféHarness } from "./MachineACaféHarness";
import {HardwareFake, HardwareFakeInterface} from "./HardwareFake";
import { TypeDeCafé } from "../../src/TypeDeCafé";

export class MachineACaféBuilder {
    private _hardware?: HardwareFakeInterface

    public static ParDéfaut() {
        return new MachineACaféBuilder().Build()
    }

    // Configure le stock d'eau pour être suffisant pour n'importe quel type de café
    public avecStockEauSuffisant() {
        this._hardware?.setWaterStock(10); // Assurez-vous que cette quantité est suffisante pour plusieurs cafés
    }

    // Configure le stock d'eau ajusté selon le type de café
    public avecStockEauAjusté(amount: number) {
        this._hardware?.setWaterStock(amount);
    }

    public Build() : MachineACaféHarness {
        let hardware: HardwareFakeInterface = new HardwareFake()
        this._hardware = hardware;
        return new MachineACaféHarness(hardware)
    }
}