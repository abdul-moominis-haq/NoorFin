// scripts/train-model.ts
import * as tf from '@tensorflow/tfjs';

async function createModel() {
    const model = tf.sequential();

    model.add(tf.layers.lstm({
        units: 32,
        inputShape: [30, 1], // 30 days of history
        returnSequences: false
    }));

    model.add(tf.layers.dense({ units: 10, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 5, activation: 'linear' })); // Predict next 5 days

    model.compile({
        optimizer: tf.train.adam(),
        loss: 'meanSquaredError'
    });

    // Here you would add your training data and train the model
    // const history = await model.fit(trainXs, trainYs, {epochs: 10});

    // Save the model
    await model.save('file://./public/models/price-prediction');
}

createModel();