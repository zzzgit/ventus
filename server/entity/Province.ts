import City from "./City";

class Province {
    /**
     * 
     * @param symbol used to connect to other systems
     * @param name 
     * @param isSpecial is it a municipality
     */
    constructor(symbol: string, name: string, isSpecial: boolean) {
        this.symbol = symbol
        this.name = name
        this.isSpecial = isSpecial
    }
    id: number
    symbol: string
    name: string
    isSpecial: boolean
    children: Array<City>
}

export default Province
