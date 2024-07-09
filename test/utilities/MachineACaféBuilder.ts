import { MachineACaféHarness } from "./MachineACaféHarness";
import {HardwareFake, HardwareFakeInterface} from "./HardwareFake";
import { TypeDeCafé } from "../../src/TypeDeCafé";

export class MachineACaféBuilder {
    public static ParDéfaut() {
        return new MachineACaféBuilder().Build()
    }

    // Configure le stock d'eau pour être suffisant pour n'importe quel type de café
    public avecStockEauSuffisant() {
        this.hardware.setWaterStock(10); // Assurez-vous que cette quantité est suffisante pour plusieurs cafés
    }

    // Configure le stock d'eau ajusté selon le type de café
    public avecStockEauAjusté(type: TypeDeCafé) {
        const waterNeeded = type === TypeDeCafé.NORMAL ? 1 : 2; // 1 dose pour NORMAL, 2 doses pour ALLONGE
        this.hardware.setWaterStock(waterNeeded); // Configure le stock exactement pour le type de café spécifié
    }

    public Build() : MachineACaféHarness {
        let hardware: HardwareFakeInterface = new HardwareFake();
        return new MachineACaféHarness(hardware)
    }
}