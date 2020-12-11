/* eslint-disable */

export default function(Crypto: any) {
  // Shortcut
  var util = Crypto.util

  Crypto.HMAC = function(hasher: any, message: any, key: any, options: any) {
    // Allow arbitrary length keys
    key =
      key.length > hasher._blocksize * 4 ? hasher(key, { asBytes: true }) : util.stringToBytes(key)

    // XOR keys with pad constants
    var okey = key,
      ikey = key.slice(0)
    for (var i = 0; i < hasher._blocksize * 4; i++) {
      okey[i] ^= 0x5c
      ikey[i] ^= 0x36
    }

    var hmacbytes = hasher(
      util.bytesToString(okey) + hasher(util.bytesToString(ikey) + message, { asString: true }),
      { asBytes: true }
    )
    return options && options.asBytes
      ? hmacbytes
      : options && options.asString
      ? util.bytesToString(hmacbytes)
      : util.bytesToHex(hmacbytes)
  }
}
