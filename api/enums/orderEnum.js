/**
 * This is enum class for order status
 */
const status = {
    "PENDING": "Pending",
    "CONFIRMED": "Confirmed",
    "CANCELLED": "Cancelled",
    "DELIVERED": "Delivered"
}

//Prevent the {status} object from being altered
Object.freeze(status)

export default status