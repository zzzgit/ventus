class Tsp {
    /**
     * 
     * @param symbol pinyin abbreviation, used to connect to other systems
     * @param name 
     */
    constructor(symbol: string, name: string) {
        this.symbol = symbol
        this.name = name
    }
    symbol: string
    name: string
    id: string
}

export default Tsp
