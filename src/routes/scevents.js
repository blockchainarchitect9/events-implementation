import { Router } from 'express';
import { myContract } from '../instance.js';
const router = Router();

router.get('/', async function (req, res, next) {
  const events = await myContract.getPastEvents('Issued', {
    fromBlock: 0,
    toBlock: 'latest',
    filter: [
      '0xda18748a62cbe2a369b5d0cc9becc1e6b4553362d98fdb595469a36e2969626c',
    ],
  });

  BigInt.prototype.toJSON = function () {
    return this.toString();
  };

  console.log('**********EVENTS********', events);
  res.send(events);
});

export default router;
