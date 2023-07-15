import { CoinCloreApiImpl } from './crypto-analise/coin-clore-Impl';
import { CoinCapImpl } from './crypto-analise/coin-cap-impl';
import { ICryptoManager } from './crypto-analise/interface/ICryptoManager';
import { Report } from './crypto-analise/models/Report';

main();

async function main(){
  create(new CoinCloreApiImpl());
  create(new CoinCapImpl());
}

async function create(manager: ICryptoManager){
  const report:Report = await manager.createReport();
  console.log(report.changePercent24HrAverage);
}