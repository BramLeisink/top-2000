<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Button from "./ui/button/button.svelte";

  const imageList: string[] = [
    "https://images.genius.com/718de9d1fbcaae9f3c9b1bf483bfa8f1.1000x1000x1.png",
    "https://images.genius.com/e5c28d1d190c94451aa6a7e1754063b5.600x600x1.jpg",
    "https://images.genius.com/b7b575c1c5015ee29a929bc6312b9f74.599x593x1.png",
    "https://images.genius.com/3e053470ebc4c406421b38b0c7701c25.1000x1000x1.png",
    "https://images.genius.com/4dff50fbd764f8cdde69c09f2d559abe.1000x1000x1.jpg",
    "https://images.genius.com/7c0220cebfc48c236bdff4776e1dc40e.440x441x1.jpg",
    "https://images.genius.com/d9ad36679aa6db9ea0da8ca3027e9358.597x600x1.jpg",
    "https://images.genius.com/2613a6bc7278c7a50e623e4efe1748ca.1000x1000x1.png",
    "https://images.genius.com/d358f24e983edee6535a00b3063dc79b.583x583x1.jpg",
    "https://images.genius.com/57e05ca38ee171cf70fd9486aa6dd40a.1000x1000x1.png",
    "https://images.genius.com/017e1a70779099e319411142098bb3a3.1000x1000x1.png",
    "https://images.genius.com/bc1d2e0fd77810ed54ee87646eba720c.1000x1000x1.png",
    "https://images.genius.com/389f7de409d3c939d81c2483be1d2627.1000x1000x1.png",
    "https://images.genius.com/7cf0988347406b807ebd5ac9b38936f0.1000x1000x1.png",
    "https://images.genius.com/55db345614086db0bf03b98a3cbfb22e.600x597x1.png",
    "https://images.genius.com/22bab4e270d6297beeccc687f9197e81.600x561x1.jpg",
    "https://images.genius.com/e904720630be29fbd958568d7c2fa991.1000x1000x1.jpg",
    "https://images.genius.com/1c46c1eee51be9d423431f4b179d9499.1000x1000x1.jpg",
    "https://images.genius.com/923f20f25715bed533b3f66c7e874ff3.1000x1000x1.png",
    "https://images.genius.com/773bf6059be64c568ed332882729da22.852x852x1.png",
    "https://i.scdn.co/image/ab67616d0000b273811e357833e9439c3d2fd9d7",
    "https://images.genius.com/bb33e7f8a3d27919179bbaf4bafa6db8.600x600x1.jpg",
    "https://images.genius.com/05e72b219fe1acb5b663f1f5f784c10b.1000x1000x1.png",
    "https://images.genius.com/b393570b7591f177b0f57d72a27c7b39.220x220x1.jpg",
    "https://images.genius.com/1fd18e7a9517263b1c78288ddfaf771b.300x300x1.jpg",
    "https://images.genius.com/57e05ca38ee171cf70fd9486aa6dd40a.1000x1000x1.png",
    "https://images.genius.com/1fbd776775d94af229db357b9d73cb60.600x600x1.jpg",
    "https://images.genius.com/767e78b53effad502d23635f6793b5f0.1000x1000x1.png",
    "https://images.genius.com/939264f959fd93691d8275aa975d2991.1000x1000x1.png",
    "https://images.genius.com/3a71c46850288c0e53b857c0434c791f.358x350x1.jpg",
    "https://images.genius.com/82e1736b6793b8517b8b63eca172c34f.560x559x1.jpg",
    "https://images.genius.com/ae22d0a4baca45f6d95099a44d603dc5.1000x1000x1.png",
    "https://images.genius.com/248c391b4d36eb541eec3d2e11cbdf0c.1000x1000x1.png",
    "https://images.genius.com/067a1a0de3cf9e35937af85867e0b39a.1000x1000x1.png",
    "https://images.genius.com/86370c0df6a7d14badcd81c13842673e.1000x1000x1.jpg",
    "https://images.genius.com/62c1640598fa6cd04c8244594f7d9aca.1000x1000x1.jpg",
    "https://images.genius.com/b52d79716437a8df8c55d4ed932ac9e8.1000x1000x1.png",
    "https://images.genius.com/c54f2d95aa48d18232e471c65c861277.220x220x1.jpg",
    "https://images.genius.com/6f02841f38709872b9cf1afde843e5b8.900x900x1.jpg",
    "https://images.genius.com/3dd6ff4dec4c562108879f5b303da164.600x600x1.png",
    "https://images.genius.com/83c4530f1cb7e5d1f63e420fb3d8328a.598x600x1.jpg",
    "https://images.genius.com/c03e03410ea0dc77f4a082a77bec6c0d.640x640x1.jpg",
    "https://images.genius.com/ca44cb452ad50cf3e47a1c3ad30ebb15.600x600x1.jpg",
    "https://images.genius.com/90f8c0ea6face4e2cc2b1d84e71c034d.1000x1000x1.png",
    "https://images.genius.com/af34f7810cc8e58c39c3175b4aa3829e.1000x1000x1.png",
    "https://images.genius.com/aecdfe926b1c6b797fffa130319b61b7.1000x1000x1.png",
    "https://images.genius.com/9805957d2843e7b7b74943745b397ab2.1000x999x1.png",
    "https://images.genius.com/f7cae8ba4368d5e564be7358e091ac7c.995x1000x1.jpg",
    "https://images.genius.com/7d48d577fd2a5c30b940f71dfe1e405b.240x240x1.jpg",
    "https://images.genius.com/1329e498f1fdc621a6a5e3015fbbe198.1000x1000x1.jpg",
    "https://images.genius.com/272e028efc4b0f72d047413d6326e237.1000x1000x1.png",
    "https://images.genius.com/a8dbbb16d6f02f2d27b86e60d11b1476.1000x1000x1.jpg",
    "https://images.genius.com/8bb1d49c7851ed0641acbb31b66ad246.318x314x1.jpg",
    "https://images.genius.com/ee52f3554fe0bc82e06590cb65fbf9e9.598x600x1.jpg",
    "https://images.genius.com/f1b06a571fd41d11092e3d7bbaeaae7b.600x602x1.jpg",
    "https://npo-artistdb.b-cdn.net/images/3b5f7514-528a-435b-828c-b830b9bb9c0e__Shallow.jpg?aspect_ratio=501%3A500&width=500&height=500",
    "https://images.genius.com/493ffeb3b62e9b448c02c5605db86880.1000x1000x1.png",
    "https://images.genius.com/aface99ac22323aec35a2841f57af5c1.600x595x1.jpg",
    "https://images.genius.com/0d626aad1648161d70f4b3fd367e0013.1000x1000x1.png",
    "https://images.genius.com/afef650b1e60e27d632e7c5765b39c37.1000x1000x1.png",
    "https://images.genius.com/6bd908f3ef19a681a3c70659842b2926.1000x1000x1.png",
    "https://images.genius.com/0b806df055006c90717986ccf60459f1.540x540x1.jpg",
    "https://images.genius.com/94f76a97372af010e915357367d22ee0.300x301x1.png",
    "https://images.genius.com/0bcf841cc25a063de7834b75378bd4f1.600x600x1.jpg",
    "https://images.genius.com/ce61c1b2664c5952984e30f9b59f1346.1000x1000x1.png",
    "https://images.genius.com/38df3b59f231f4babd59aec795764979.494x500x1.jpg",
    "https://images.genius.com/bb7acf6302636b1c8b2332220e0021ad.800x800x1.png",
    "https://images.genius.com/d7c2630b93376988b8faf81c76d9cad3.300x299x1.jpg",
    "https://images.genius.com/f3d716ed24b6ff0e25489f3dc1aa966c.1000x1000x1.png",
    "https://images.genius.com/5630055555f8ca82ec5dc1e1f98a358d.600x600x1.jpg",
    "https://images.genius.com/99347ea2134079fcb9a67381637d0699.1000x1000x1.jpg",
    "https://images.genius.com/5d980721f47a089f713f62ff549809f2.1000x1000x1.jpg",
    "https://images.genius.com/4f4c8664fcd17108a3b85f808e7f0dae.549x549x1.png",
    "https://images.genius.com/f9a98451c195c1b972d3bcef3de7e5ef.1000x1000x1.jpg",
    "https://images.genius.com/3efa8083445d42bdc57e376286260abd.500x500x1.jpg",
    "https://images.genius.com/f7c6d5354255a1f97ac5fc10dca3650d.997x1000x1.png",
    "https://images.genius.com/c308ccf4f94eb2b71a2c63a4dfb678ca.1000x1000x1.png",
    "https://images.genius.com/9f9dd2a27995e7d1b4dfdb047f1f6391.1000x1000x1.jpg",
    "https://images.genius.com/3852401ae6c6d6a51aafe814d67199f0.1000x1000x1.jpg",
    "https://images.genius.com/c5d0b5495f7d9e4124c97dda767e5bac.600x600x1.jpg",
    "https://images.rapgenius.com/8d1f967e1a123eee8a7594439f767f1e.650x633x1.jpg",
    "https://images.genius.com/0679cafdaf4f5b2fe27ebf6a78894739.1000x1000x1.jpg",
    "https://images.genius.com/1bbaab4ef54e9c4b56572b561fe96af8.1000x1000x1.jpg",
    "https://images.genius.com/b3cf2b7e3ee5b8476f4e9692f0781eb8.1000x1000x1.jpg",
    "https://images.genius.com/51bc0298f923c753b08e65575cb9b1f3.600x598x1.jpg",
    "https://images.genius.com/4ce176950147950565193ce137470275.690x690x1.jpg",
    "https://images.genius.com/fec04140607e338289088f2a18992615.1000x1000x1.png",
    "https://images.genius.com/85f5a0ea6444f048f35ac401fc26e633.1000x1000x1.png",
    "https://images.genius.com/de9b15721726a293a0843c95b70f7392.1000x1000x1.png",
    "https://images.genius.com/005e30e154b82811bd28308b7c0a63bc.1000x1000x1.png",
    "https://images.genius.com/843d363efe3389158551d27623d4fa14.1000x1000x1.jpg",
    "https://images.genius.com/726525b2fb093d17404f3dfe7cbc1679.1000x1000x1.png",
    "https://images.genius.com/ce00a5eb58b974d35159f76e2e65b1f3.528x529x1.jpg",
    "https://images.genius.com/a845f95e2abe4e8a6079ea546c6cf190.600x611x1.jpg",
    "https://npo-artistdb.b-cdn.net/images/b883bcd3-0268-424d-930f-aaee5907b510__Somebody-To-Love-Live.jpg?aspect_ratio=501%3A500&width=500&height=500",
    "https://npo-artistdb.b-cdn.net/images/6a93cde1-455b-4391-b4f7-cca568267637__Running-Up-That-Hill.jpg?aspect_ratio=501%3A500&width=500&height=500",
    "https://images.genius.com/dcbc7c8e4e258297972d1c40d701a928.1000x1000x1.jpg",
    "https://images.genius.com/29580ec9d8ddde1b1cfc004d6eef50bc.1000x1000x1.png",
    "https://images.rapgenius.com/c7233875a7aadfeb60cf3a097e242209.280x280x1.jpg",
    "https://images.genius.com/69e687d781a0f16cba9799793f2c00f7.1000x1000x1.png",
    "https://images.genius.com/b85a756c9479fa30abb91c8324489b3b.799x799x1.png",
    "https://images.genius.com/e4ea9352a1133e89ad2f90af14786146.523x519x1.jpg",
    "https://images.genius.com/79adebc3234707fd0bffb05cd3c28388.600x600x1.jpg",
    "https://images.genius.com/1bc7026836c0de66375664e3021f91f7.1000x1000x1.jpg",
    "https://images.genius.com/f149073275fe51d31686e18ffd9323ee.1000x1000x1.png",
    "https://images.genius.com/8ffabb8cb5e82037b87c51176b6d7777.449x449x1.jpg",
    "https://images.genius.com/877635e22a3183eca2062095bd3b561d.820x820x1.jpg",
    "https://images.genius.com/e11c0993967d80122b08f4a4067510b7.598x598x1.jpg",
    "https://images.genius.com/d72d2be3e0206ebf67a0f83c807a4024.1000x1000x1.jpg",
    "https://images.genius.com/448ccae5c89654364ccff85483218b7b.1000x1000x1.jpg",
    "https://npo-artistdb.b-cdn.net/images/Lady_Gaga_and_Bruno_Mars_-_Die_with_a_Smile.png?aspect_ratio=501%3A500&width=500&height=500",
    "https://images.genius.com/2680faf3d8fe8caf0458e56c6160900d.598x600x1.jpg",
    "https://images.genius.com/0c53e3088fa1b572682ddde8fcee6072.1000x1000x1.png",
    "https://images.genius.com/78920f780a249601ab1398374939363f.1000x1000x1.jpg",
    "https://npo-artistdb.b-cdn.net/images/b2d2b60d-5821-4eff-a0f3-c0956ef2c070__Pastorale.jpg?aspect_ratio=501%3A500&width=500&height=500",
    "https://images.genius.com/0d253803aa2ea1501fb39be48193f61e.1000x1000x1.png",
    "https://images.genius.com/141a67bfbd7122a2837b2dc0d31e34b1.540x540x1.jpg",
    "https://images.genius.com/b90303cb31817e070f025bdc77317694.1000x1000x1.jpg",
    "https://images.genius.com/40d6e37212f0ed5e84f656fba78ae9c0.722x719x1.jpg",
    "https://images.genius.com/6b5674d28541005ef3c1e13131f6d449.595x600x1.jpg",
    "https://images.genius.com/dbee9546438a7526ea548a9f11e3ad70.300x300x1.jpg",
    "https://images.genius.com/0be4a1bae4a3e6315ad588105e0a88c0.1000x1000x1.jpg",
    "https://images.genius.com/981b8fd949ef25070782d408a84d0b87.1000x1000x1.png",
    "https://images.genius.com/7e7ee08656c45eb9a6a9817308008e16.776x768x1.jpg",
    "https://images.rapgenius.com/f93b9f27f7f434d6726c6962332e0730.303x300x1.jpg",
    "https://images.genius.com/030d095cd7008b34dec644b457bf2460.1000x1000x1.png",
    "https://npo-artistdb.b-cdn.net/images/ec039f40-e637-439d-9755-b37f6f327128__Under-Pressure.jpg?aspect_ratio=501%3A500&width=500&height=500",
    "https://images.genius.com/1409498f609379e18535acc823111ce1.1000x1000x1.jpg",
    "https://images.genius.com/dfbb8678206013e867f47948c44e89a1.1000x985x1.jpg",
    "https://images.genius.com/fbf2e2e962596afc37e66ce1b9109520.1000x1000x1.png",
    "https://images.genius.com/5538ab98016314fd6d617ffb3d5d926b.1000x1000x1.png",
    "https://images.genius.com/85ff59df2d3cc203524242393cfdd9d2.640x565x1.jpg",
    "https://npo-artistdb.b-cdn.net/images/99a79cca-74c6-4767-95e0-aa64a6d19c9e__phantom.jpg?aspect_ratio=501%3A500&width=500&height=500",
    "https://npo-artistdb.b-cdn.net/images/63269d7d-2ada-46b1-8d24-a410ccb3e271__A-Sky-Full-of-Stars.jpg?aspect_ratio=501%3A500&width=500&height=500",
    "https://images.genius.com/dbd2d0d9455c26398c90b4245d0de87c.300x300x1.jpg",
    "https://images.genius.com/34ca8d58e301f210317dc35a698cca85.1000x1000x1.png",
    "https://images.genius.com/00affcd6e1a547de0c698ab3ec06a1f1.687x700x1.png",
    "https://images.genius.com/c1118992b0e83b99d1c042b9596cdd17.597x599x1.jpg",
    "https://images.genius.com/ed39990dae20f64d847466a0ecddbdb8.1000x1000x1.png",
    "https://images.genius.com/7be3b41164e2226412837cb714aab218.1000x1000x1.jpg",
    "https://images.genius.com/992df11e9fe7c51d00e7ebebf4ec57c1.1000x1000x1.png",
    "https://images.genius.com/fd7f9a42cb64c472eb66ee6847619df7.1000x1000x1.png",
    "https://images.genius.com/bf705f7b0a2cdf0c76588aae2256616d.1000x1000x1.png",
    "https://images.rapgenius.com/a765f2f0f00e07cc65de2f388d3dacf8.1000x1000x1.jpg",
    "https://images.genius.com/0a5907ea96efad7f39ac8cfa40362af0.902x902x1.webp",
    "https://images.genius.com/13e088551d87cce3a0bb5d0263f2a62c.1000x1000x1.png",
    "https://images.genius.com/59231b91803471dff6749f926e05f121.624x624x1.jpg",
    "https://images.genius.com/ccfd4949f158a091bafa25495ae0c47e.1000x1000x1.png",
    "https://images.genius.com/de407353b4db5a67557de563b970e59f.600x602x1.jpg",
    "https://images.genius.com/d0a3b27175c8397b7ac36b6c691b719a.597x600x1.jpg",
    "https://images.genius.com/5c3822eba1d0624efb47b0b96025ad66.877x877x1.png",
    "https://images.genius.com/9add24b6bb4e5acd8eaa2df08b4abb0b.1000x1000x1.png",
    "https://images.genius.com/5ddaca96d2651b54e92ef888c386e356.200x200x1.png",
    "https://images.genius.com/6f23ac4e69e0d616a34d20372028b16b.1000x1000x1.png",
    "https://images.genius.com/6ef0d145086bb165f6bd97c3c3ed2616.1000x1000x1.png",
    "https://images.genius.com/4c73fc5e379608e73e125c743e7c87f9.986x1000x1.jpg",
    "https://images.genius.com/554f27fe12f54485bd4051d6b29b3825.600x600x1.jpg",
    "https://images.genius.com/83730c9976747487335a03bab9aa3c09.600x600x1.png",
    "https://images.genius.com/a5139b0936d33fec7e8654f1144d2be8.1000x1000x1.png",
    "https://images.genius.com/e46b1bd5221086e8396f8680c083fba0.1000x1000x1.png",
    "https://images.genius.com/27836779d63de73ab4dfdc7f787604db.300x300x1.jpg",
    "https://images.genius.com/46464c5926ae43e8bbcdaa87b73b29b2.599x596x1.jpg",
    "https://images.genius.com/99819962fa1ff47c485dc8cff72d030f.1000x1000x1.png",
    "https://images.genius.com/8ef9fde8da082e6c281f9ff5eb668bc1.1000x1000x1.png",
    "https://images.genius.com/fbb13ef5e4e4c4bd6567dc375ffb52fb.1000x1000x1.png",
    "https://images.genius.com/a14a1afd912f8bd8619eff24ba88bc97.600x600x1.jpg",
    "https://images.genius.com/564db7dd9b6d377c6c374a79378601f2.718x718x1.jpg",
    "https://images.genius.com/0c6b09c82e60def45c2985294d3b422e.640x640x1.jpg",
    "https://images.genius.com/561c0a6e0c2b3febb417f06b9e783c54.1000x1000x1.png",
    "https://images.genius.com/0ed062e358800a3a3a13d00863efa2e5.1000x1000x1.png",
    "https://images.genius.com/c49e6c88fb3aaca713fab7e9109b8f52.998x1000x1.jpg",
    "https://images.genius.com/2a4ab1a71f22948308bb49b4476cc2a1.600x600x1.jpg",
    "https://images.genius.com/ffbdf0223d19e750fd16c8624a3d3ccc.1000x1000x1.png",
    "https://images.genius.com/3f229614625937cce86c55f7e9cb61ec.1000x1000x1.jpg",
    "https://npo-artistdb.b-cdn.net/images/c7350219-7b05-40d2-b5e2-589fa6787ba2__Islands-In-The-Stream.jpg?aspect_ratio=501%3A500&width=500&height=500",
    "https://images.genius.com/f1a57e80c3ce35c74cb13f815d0d99a8.600x600x1.jpg",
    "https://images.genius.com/bf85dc4f17f2eb8798fe1da61e8815d3.275x277x1.jpg",
    "https://images.genius.com/ef23c8ff38a50d33b77e8791f0804e2f.594x594x1.jpg",
    "https://images.genius.com/7c3925722cd0c4018dfbe3db61bb4f2e.1000x1000x1.jpg",
    "https://images.genius.com/02e3ba0e381a116c1e7368e17ada6348.1000x1000x1.png",
    "https://images.genius.com/e36943be21fe06170991dd3f24bdf25a.599x592x1.jpg",
    "https://npo-artistdb.b-cdn.net/images/3689eb09-7493-451a-993a-c4e3fe77c9d7__Hoe-Het-Danst.jpg?aspect_ratio=501%3A500&width=500&height=500",
    "https://images.genius.com/e1f523eade73cd82361c573a684390e3.1000x1000x1.png",
    "https://images.genius.com/06b63cb3ea5d3e2fd3c7296253491851.800x800x1.jpg",
    "https://images.genius.com/dfeac0eb5bca632066d9bae754b63fb1.1000x1000x1.jpg",
    "https://images.genius.com/82bff478914823e56232c40725f9e411.700x700x1.jpg",
    "https://images.genius.com/723a010c4f245165b60dae8d3af092e4.991x1000x1.jpg",
    "https://images.genius.com/11605c53d937a6c1646008e340879a1a.1000x1000x1.jpg",
    "https://assets.genius.com/images/default_cover_image.png?1766160293",
    "https://images.genius.com/e365d594ae9169ded27b222f4279d05e.1000x1000x1.png",
    "https://images.genius.com/404c122a0fd69cc92f38e1509ea5ead6.1000x1000x1.png",
    "https://images.genius.com/bb5f7c3592825e1ce81275e8a711212a.1000x1000x1.jpg",
    "https://images.genius.com/4c441ba8b64a1a05cd0f222209b3f2de.990x990x1.png",
    "https://images.genius.com/cbbe187b2175d915714e7459267ff4e3.852x852x1.png",
    "https://images.genius.com/2f4ee4ceac8ea71bb2341cfbf53ad37b.500x504x1.png",
    "https://images.genius.com/cb4808bd0c8deb5f219d5f52e8906017.1000x1000x1.png",
    "https://images.genius.com/0b64c51bdf7c87d5ca7f783709d34ef5.1000x1000x1.png",
    "https://images.genius.com/813a80c3317db32f5fb45be2e102281b.1000x1000x1.png",
    "https://images.genius.com/040096ec3e273560bf7566d947a661e3.1000x1000x1.png",
    "https://images.genius.com/addaf66fce10c94da4f62deffc19fdd0.1000x1000x1.png",
    "https://npo-artistdb.b-cdn.net/images/940477bf-0185-46b5-a3e2-ded6c7b7a365__DJ-Paul-Elstak.jpg?aspect_ratio=501%3A500&width=500&height=500",
    "https://images.genius.com/5e40385cea2492c190801820852697b3.600x600x1.png",
    "https://images.genius.com/2db200d0882ae370680d440093798b35.1000x1000x1.png",
    "https://images.genius.com/a31268a2a5e5142cc15dfa4904b4c192.599x587x1.jpg",
    "https://images.genius.com/06982ce5a55c755322de3befe503375f.1000x1000x1.png",
    "https://images.genius.com/163b22cfd296dde2a03d120d05f5f385.794x800x1.jpg",
    "https://images.genius.com/09825f1b03c944f9a89fa391fcbc717f.480x480x1.jpg",
    "https://images.genius.com/f9bfd62a8c651caab16f631039a9a0b6.600x600x1.jpg",
    "https://images.genius.com/15ae76e0304795ce17ee1456ee100123.1000x1000x1.jpeg",
    "https://images.genius.com/d1040977fdb00c0d896bc3dcd6bef273.314x317x1.jpg",
    "https://images.genius.com/8da00a045e1fbe6004a3e670c44bbc46.1000x1000x1.jpg",
    "https://npo-artistdb.b-cdn.net/images/e44963fe-6749-40a1-af1d-c4921c969066__Zoutelande.jpg?aspect_ratio=501%3A500&width=500&height=500",
    "https://images.genius.com/34ac761c33b7e639b3e5c3d205867ffd.1000x1000x1.png",
    "https://images.genius.com/81ef46b31ae61cf93d5062d28cf8540c.1000x1000x1.png",
    "https://images.genius.com/51494dc605cdc5740158c8eff1b79366.1000x1000x1.jpg",
    "https://images.genius.com/65281b8dca7a471266e85d9648f5b5b7.1000x1000x1.png",
    "https://images.genius.com/077e11766b2f9fb2b9366843f495d1af.800x800x1.jpg",
    "https://images.genius.com/c937e86fdf781628bd1a81ad35450f87.280x280x1.jpg",
    "https://images.genius.com/d6dc676f347980bbb58f0d04e34f4ce0.1000x1000x1.jpg",
    "https://images.genius.com/af2e9fb9ee70dd220f2fc17eed8b720e.1000x1000x1.png",
    "https://npo-artistdb.b-cdn.net/images/af94fa97-dcbb-4661-a31d-b8cdfefe0d89__Sorry.jpg?aspect_ratio=501%3A500&width=500&height=500",
    "https://images.genius.com/885f1fc5066525c20fe787b6e3c2e59f.600x600x1.png",
    "https://images.genius.com/01674054f5f0d10997929b3cf88ffc8e.1000x1000x1.png",
    "https://images.genius.com/4609644b0cd5f21cd0ad0e232a2531f8.599x591x1.jpg",
    "https://images.genius.com/2e0782594e39983edfae07a73a23e1e1.1000x1000x1.jpg",
    "https://images.genius.com/4f9a93e0b78d6b0e06fe4b381b5a4ed4.1000x1000x1.png",
    "https://images.genius.com/96e31361226e741c9a3e3733e3ff1464.1000x1000x1.png",
    "https://images.genius.com/c0a0b6f8f6152ca335eedbe5bf46a6ee.595x600x1.jpg",
    "https://images.genius.com/fd81fb694c13b17e072c1849db3b93e5.640x640x1.jpg",
    "https://images.genius.com/6485c5fdd7b5c66c99f804addc5d681a.813x813x1.png",
    "https://images.genius.com/e7aacf0af81cf270fa2b67833c018872.1000x1000x1.png",
    "https://images.genius.com/7026bcb3bce6dcf6dfac1027f97ccfaf.598x583x1.jpg",
    "https://images.genius.com/945da62012bcd85bd64ecbad9f62c04e.700x700x1.jpg",
    "https://images.genius.com/864f3aedd6108850c9f01a326e2449fe.1000x1000x1.png",
    "https://images.genius.com/bb865dcf124f908ed180cd82ae29bd60.600x600x1.jpg",
    "https://images.genius.com/96e1b600a3f0ff62db477b9748333099.600x600x1.jpg",
    "https://images.genius.com/3517cedf9f6d66ac4bc9fbbd37c78087.318x318x1.jpg",
    "https://images.genius.com/27f71302e78fbad0fcf7981a213fbd96.1000x1000x1.png",
    "https://images.genius.com/18033c31bfd6f678a74cd58980a172e6.600x600x1.jpg",
    "https://images.genius.com/8168007413bab0f47cdfb5fd6ffb360e.800x797x1.jpg",
    "https://images.genius.com/627bed0580afcb241d1b28897499bfaa.600x600x1.jpg",
    "https://images.genius.com/7d83862367edb822289ba66db9c1cb7e.1000x1000x1.png",
    "https://images.genius.com/d5073771eb1f1e9b636f35ab25d418d8.800x800x1.jpg",
    "https://images.genius.com/da86f0781bd17b2c687fb88d19bfb00c.804x804x1.jpg",
    "https://images.genius.com/30198e345fb5faadc702a06c5c849e20.1000x1000x1.png",
    "https://images.genius.com/5774fa0eb0b82d34be2c70be57349efc.1000x991x1.jpg",
    "https://images.genius.com/972c6b495ffd6c69551d266adc48e94c.1000x1000x1.png",
    "https://images.genius.com/ee5193742ab8706aa4874082471ab5a0.500x500x1.jpg",
    "https://images.genius.com/a4f09d49179c41d09fa972c9971524ac.988x1000x1.jpg",
    "https://images.genius.com/e7c004d9c548b6266cd351ee9dd93e97.1000x1000x1.png",
    "https://images.genius.com/49e22aaed018c672a881f594d51ee571.400x400x1.png",
    "https://images.genius.com/65b28a256db0e364ea0f05bca27ce765.595x594x1.png",
    "https://images.genius.com/7eab6cb180687a751be5775193701303.500x500x1.jpg",
    "https://images.genius.com/c0fe9e93078ab45da0013f0a2fb1eca4.800x800x1.jpg",
    "https://images.genius.com/db0ccd70bf467e756e0ecbda804657ed.1000x1000x1.png",
    "https://images.genius.com/a1daf6ec98adc198b99c4fdb031c5dcd.1000x1000x1.png",
    "https://images.genius.com/95cb0e528de7ac0f50e944a9061541cb.600x600x1.jpg",
    "https://images.genius.com/a9fa6bfb946e5ecde0d63fe20073d5c7.1000x1000x1.png",
    "https://images.genius.com/650ad170c13614e0e95fc056eaa30cc2.500x500x1.jpg",
    "https://images.genius.com/debddb729cac7642b7d0eae57234985d.1000x1000x1.jpg",
    "https://images.genius.com/fd1c549ca05d65ba36a5bf51e4645812.500x500x1.jpg",
    "https://images.genius.com/c853da81526f84608dbece710807e3ed.300x300x1.jpg",
    "https://images.genius.com/12b328b46e3bbbd795ca58078b69cdfa.300x300x1.jpg",
    "https://images.genius.com/35fad95b68ee49ae50eb71a918075e75.1000x1000x1.png",
    "https://images.genius.com/f288e4e2216735ef13c09e3bfcffffa1.1000x1000x1.png",
    "https://images.genius.com/4ec45c3c6b52d9639d558e25c3e1550f.500x500x1.png",
    "https://images.genius.com/62096cf2413d9f9c66fdf3971aab008a.500x500x1.jpg",
    "https://assets.genius.com/images/default_cover_image.png?1766160293",
    "https://images.genius.com/81ac23201459f82652233c1297738090.1000x1000x1.png",
    "https://images.genius.com/7809d535eef0145a98d1ef1d5fbe4391.1000x1000x1.jpg",
    "https://images.genius.com/d33c956e52baece740fcad448281c3d6.1000x1000x1.png",
    "https://images.genius.com/cc2966bf70ee50e5a5a70e946e254416.1000x1000x1.png",
    "https://images.genius.com/d5f08e09bdec726c0064a25337470679.1000x1000x1.png",
    "https://images.genius.com/72f0ff2292facbf6d53fd9d5cdfc3004.1000x1000x1.jpg",
    "https://images.genius.com/548269a22332e621a72bade5f6116a0b.600x594x1.jpg",
    "https://images.genius.com/42aa95f8ced43fa070adf372e3afdf43.1000x1000x1.png",
    "https://images.genius.com/b39b9381ffa410bd95c3ab6b6f5ffdaa.600x600x1.jpg",
    "https://images.genius.com/1661bdeeceac49a200eab8bdd28246d4.800x794x1.jpg",
    "https://images.genius.com/e728db07b2c44e2c04199d49ea89785c.600x597x1.jpg",
    "https://images.genius.com/228ad76c5f3114586e0817e8e3a845c1.1000x1000x1.png",
    "https://images.genius.com/ae22d0a4baca45f6d95099a44d603dc5.1000x1000x1.png",
    "https://images.genius.com/65281b8dca7a471266e85d9648f5b5b7.1000x1000x1.png",
    "https://images.genius.com/7de5bb7afb44acc12b2bf5a10ed63ffc.1000x1000x1.jpg",
    "https://images.genius.com/74945cb0966018de928a2ee3b3a23935.597x597x1.jpg",
    "https://images.genius.com/34c1c35ca27a735e6e5f18611acb1c16.1000x1000x1.png",
    "https://images.genius.com/398973e4b978ac51f1600d45d4aaf599.599x592x1.png",
    "https://images.genius.com/f4498c9ed874613d46dcce0966c0955e.600x600x1.png",
    "https://images.genius.com/85fd85e656256f8c1eb22e0ad6d499bd.600x600x1.jpg",
    "https://images.genius.com/48caff7f3cd18b4f4e9b2db1baf3d576.1000x1000x1.png",
    "https://images.genius.com/b680e9bcd6301c41196eb7f59f8326ab.1000x1000x1.png",
    "https://images.genius.com/bfcde690889ad35d372db75f8a1e0741.1000x1000x1.png",
    "https://images.genius.com/8b3670f00f07a01fdfa767e7e1993247.950x950x1.jpg",
    "https://images.genius.com/731cbe3604bc3128889a3f4ffb4317ae.480x480x1.jpg",
    "https://images.genius.com/7b28feb5a28583f73191d1f26ca68c76.1000x1000x1.jpg",
    "https://images.genius.com/077947f63d8090245b3935e82f8bd63f.1000x1000x1.png",
    "https://images.genius.com/af2f88cc58585518243734796a51844d.1000x999x1.png",
    "https://images.genius.com/410ce67854eaf9c0d48f867c9648b2b7.594x591x1.jpg",
    "https://images.genius.com/166e23f65880aa49c32292e645fe1e79.600x600x1.jpg",
    "https://images.genius.com/b7e0a0a94b59ab54d73020976964be65.1000x1000x1.png",
    "https://npo-artistdb.b-cdn.net/images/93ca9e4d-06a8-4a3f-8614-e74286a35afa__Rocket-Man.jpg?aspect_ratio=501%3A500&width=500&height=500",
  ];

  interface GridSquare {
    id: number;
    currentImage: string;
    nextImage: string | null;
    isTransitioning: boolean;
    isLoaded: boolean;
  }

  let gridSquares = $state<GridSquare[]>([]);
  let squareSize = $state(150);
  let cols = $state(0);
  let rows = $state(0);
  let gridWidth = $state(0);
  let gridHeight = $state(0);
  let offsetX = $state(0);
  let offsetY = $state(0);
  let isInitialLoadComplete = $state(false);

  let containerW = $state(0);
  let containerH = $state(0);

  let transitionInterval: number | null = null;
  let isComponentMounted = true;
  const imageCache = new Set<string>();

  function shuffle<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function getRandomImage(): string {
    return imageList[Math.floor(Math.random() * imageList.length)];
  }

  async function preloadImage(url: string): Promise<void> {
    if (imageCache.has(url)) return Promise.resolve();
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        imageCache.add(url);
        resolve();
      };
      img.onerror = () => {
        console.warn(`Failed: ${url}`);
        resolve();
      };
      img.src = url;
    });
  }

  async function loadImagesRandomly() {
    const indices = shuffle(gridSquares.map((_, i) => i));

    for (const index of indices) {
      if (!isComponentMounted) return;

      const square = gridSquares[index];
      await preloadImage(square.currentImage);

      if (!isComponentMounted) return;
      gridSquares[index].isLoaded = true;

      await new Promise((resolve) => setTimeout(resolve, 30));
    }

    isInitialLoadComplete = true;
    startTransitions();
  }

  function calculateGrid(width: number, height: number) {
    if (width === 0 || height === 0) return;

    let newSquareSize = 160;
    if (width < 640) newSquareSize = 100;
    else if (width < 1024) newSquareSize = 120;
    else if (width < 1536) newSquareSize = 140;

    const newCols = Math.ceil(width / newSquareSize) + 2;
    const newRows = Math.ceil(height / newSquareSize) + 2;

    if (newCols === cols && newRows === rows) {
      gridWidth = newCols * newSquareSize;
      gridHeight = newRows * newSquareSize;
      offsetX = -(gridWidth - width) / 2;
      offsetY = -(gridHeight - height) / 2;
      return;
    }

    squareSize = newSquareSize;
    cols = newCols;
    rows = newRows;
    gridWidth = cols * squareSize;
    gridHeight = rows * squareSize;
    offsetX = -(gridWidth - width) / 2;
    offsetY = -(gridHeight - height) / 2;

    initializeGrid();
  }

  function initializeGrid() {
    const totalSquares = cols * rows;
    const shuffledImages = shuffle(imageList);

    gridSquares = Array.from({ length: totalSquares }, (_, i) => ({
      id: i,
      currentImage:
        shuffledImages[i % shuffledImages.length] ?? getRandomImage(),
      nextImage: null,
      isTransitioning: false,
      isLoaded: false,
    }));

    isInitialLoadComplete = false;
    loadImagesRandomly();
  }

  function startTransitions() {
    if (transitionInterval) clearInterval(transitionInterval);
    transitionInterval = window.setInterval(() => {
      if (isComponentMounted) fadeRandomSquare();
    }, 1500);
  }

  async function fadeRandomSquare() {
    if (gridSquares.length === 0 || !isInitialLoadComplete) return;

    const idx = Math.floor(Math.random() * gridSquares.length);
    const square = gridSquares[idx];

    if (square.isTransitioning) return;

    const newImage = getRandomImage();
    await preloadImage(newImage);

    if (!isComponentMounted) return;

    gridSquares[idx].nextImage = newImage;
    gridSquares[idx].isTransitioning = true;

    setTimeout(() => {
      if (!isComponentMounted) return;
      gridSquares[idx].currentImage = newImage;
      gridSquares[idx].nextImage = null;
      gridSquares[idx].isTransitioning = false;
    }, 800);
  }

  $effect(() => {
    calculateGrid(containerW, containerH);
  });

  onMount(() => {
    isComponentMounted = true;
  });

  onDestroy(() => {
    isComponentMounted = false;
    if (transitionInterval) clearInterval(transitionInterval);
  });
</script>

<section
  class="relative h-screen w-full overflow-hidden bg-black"
  bind:clientWidth={containerW}
  bind:clientHeight={containerH}
>
  <div
    class="absolute grid-container"
    style="
      left: {offsetX}px; 
      top: {offsetY}px; 
      width: {gridWidth}px; 
      height: {gridHeight}px;
      display: grid;
      grid-template-columns: repeat({cols}, {squareSize}px);
      grid-template-rows: repeat({rows}, {squareSize}px);
    "
  >
    {#each gridSquares as square (square.id)}
      <div class="square-container">
        <img
          src={square.currentImage}
          alt=""
          class="square-image"
          class:loaded={square.isLoaded}
          loading="eager"
        />
        {#if square.nextImage && square.isTransitioning}
          <img
            src={square.nextImage}
            alt=""
            class="square-image square-overlay z-10"
            loading="eager"
          />
        {/if}
      </div>
    {/each}
  </div>

  <div class="absolute inset-0 bg-black/75 z-20"></div>

  <div
    class="relative z-30 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-5xl text-center">
      <h1
        class="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl drop-shadow-2xl font-header"
      >
        Top2000+
      </h1>
      <p
        class="mt-5 text-base leading-7 text-gray-100 sm:mt-6 sm:text-lg md:text-xl lg:text-2xl drop-shadow-lg max-w-3xl mx-auto"
      >
        Aan deze Top2000-fansite wordt nog hard gewerkt. Tot die tijd kun je
        alvast ons eerste spel Hoger Lager spelen!
      </p>
      <div
        class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
      >
        <Button
          href="/s/hoger-lager"
          class="h-14 px-8 w-full sm:w-auto text-base rounded-lg font-semibold"
          >Speel Hoger Lager</Button
        >
        <Button
          href="mailto:bram@leis.ink"
          variant="ghost"
          class="h-14 px-8 w-full sm:w-auto text-base rounded-lg font-semibold border-white/90 bg-white/5 backdrop-blur-sm text-white border-2 hover:bg-white/10"
          >Contact</Button
        >
      </div>
    </div>
  </div>
</section>

<style>
  .grid-container {
    position: absolute;
    will-change: transform;
  }

  .square-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #111;
  }

  .square-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .square-image.loaded {
    opacity: 1;
  }

  .square-overlay {
    animation: fadeIn 0.8s ease-in-out forwards;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
