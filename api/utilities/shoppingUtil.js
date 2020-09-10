/**
 * This an order status singly linked list class
 */
import Status from '../enums/orderEnum'

class Node {
    constructor(data, next) {
        this.data = data
        this.next = next
    }
}

class StatusLinkedList {
    constructor(head) {
        this.head = head
    }
}

const delivered = new Node(Status.DELIVERED, {})
const confirmed = new Node(Status.CONFIRMED, delivered)
const pending = new Node(Status.PENDING, confirmed)

const linkedList = new StatusLinkedList(pending)

/**
 * Get next status
 * 
 * @param {Current order status} currentStatus 
 */
const nextStatus = (currentStatus) => {
    let curr = linkedList.head

    while (curr.data !== currentStatus) {
        curr = curr.next
    }

    return curr.next.data
}

export default nextStatus