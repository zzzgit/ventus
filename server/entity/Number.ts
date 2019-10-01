class Number {
    /**
     * 
     * @param package_id the package it belongs to 
     * @param number 
     * @param price 
     * @param balance 
     */
    constructor(package_id: number, number: string, price: number, balance: number) {
        this.package_id = package_id
        this.number = number
        this.price = price
        this.balance = balance
    }
    id: number
    package_id: number
    number: string
    price: number
    balance: number
    status: number
}

export default Number
