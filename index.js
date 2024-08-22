import { ethers } from 'ethers';
import writeXlsxFile from "write-excel-file/node";

// Nhập số lượng ví muốn tạo
const numOfWallets = process.env.num || 10; // Thay đổi giá trị này để tạo số lượng ví mong muốn

let walletInfo = [];

for (let i = 0; i < numOfWallets; i++) {
    // Tạo ví mới
    const wallet = ethers.Wallet.createRandom();

    // Lấy địa chỉ ví
    const address = wallet.address;

    // Lấy private key
    const privateKey = wallet.privateKey;

    // Lấy mnemonic phrase
    const mnemonic = wallet.mnemonic.phrase;

    // In thông tin ra console
    console.log(`Wallet ${i + 1}`);
    console.log('Address:', address);
    console.log('Private Key:', privateKey);
    console.log('Mnemonic Phrase:', mnemonic);
    console.log('-------------------------------');

    // Lưu trữ thông tin cho từng ví
    walletInfo.push({
        Address: address,
        PrivateKey: privateKey,
        MnemonicPhrase: mnemonic
    });
}

const HEADERS = Object.keys(walletInfo[0]).map(key => ({
    value: key,
    fontWeight: 'bold'
}));

const rows = walletInfo.map(wallet => {
    const row = [];
    for (let key in wallet) {
        row.push({
           type: String,
           value: wallet[key]
        });
    }
    return row;
});

const data = [HEADERS, ...rows];

writeXlsxFile(data, {
    filePath: '/Users/duyviet/workspaces/CreateEtherAccount/wallets.xlsx'
}).then((res) => {
    console.log('Thông tin tất cả các ví đã được lưu vào wallets.xlsx');
});
