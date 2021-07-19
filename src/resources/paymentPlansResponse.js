const Resource = require('resources.js');
class PaymentPlansResponse extends Resource {
    toArray() {
        return {
            id: this.id,
            name: this.name,
            benefits: JSON.parse(this.benefits)
        }
    }
}

module.exports = PaymentPlansResponse;