get(clienteId) {
    return new Promise((resolve, reject) => {
        mongoose.model('Cliente').findById(clienteId, function(err, document) {
            if (err) {
                return reject(err);
            }
            resolve(document);
        });
    });
};