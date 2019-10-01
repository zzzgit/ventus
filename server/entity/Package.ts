class Package {
    /**
     * 
     * @param name 
     * @param symbol used to connect to other systems
     */
    constructor(name: string, symbol: string) {
        this.name = name
        this.symbol = symbol
    }
    id: number
    name: string
    symbol: string
}

export default Package
