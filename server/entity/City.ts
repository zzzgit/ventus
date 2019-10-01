class City {
    /**
     * 
     * @param symbol used to connect to other systems
     * @param name 
     * @param province_id refert to the province it belongs to 
     */
    constructor(symbol: string, name: string, province_id: number) {
        this.symbol = symbol
        this.name = name
        this.province_id = province_id
    }
    id: number
    symbol: string
    name: string
    province_id: number
}

export default City
