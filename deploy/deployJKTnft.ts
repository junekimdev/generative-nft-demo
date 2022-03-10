import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deploy } = hre.deployments;
  const { deployer } = await hre.getNamedAccounts();

  const deployResult = await deploy('JKTnft', { from: deployer, log: true });
  console.log('Contract deployed at:', deployResult.address);
};
export default func;
func.tags = ['JKTnft'];
