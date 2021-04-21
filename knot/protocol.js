export const valueType = {
  int: 0x01,
  float: 0x02,
  bool: 0x03,
  raw: 0x04,
  invalid: 0xff,
};

export const type = {
  none: {
    id: 0x0000,
    units: {
      notApplicable: 0x00,
    },
    value: valueType.invalid,
  },
  voltage: {
    id: 0x0001,
    units: {
      v: 0x01,
      mv: 0x02,
      kv: 0x03,
    },
    value: valueType.int,
  },
  current: {
    id: 0x0002,
    units: {
      a: 0x01,
      ma: 0x02,
    },
    value: valueType.int,
  },
  resistance: {
    id: 0x0003,
    units: {
      ohm: 0x01,
    },
    value: valueType.int,
  },
  power: {
    id: 0x0004,
    units: {
      w: 0x01,
      kw: 0x02,
      mw: 0x03,
    },
    value: valueType.int,
  },
  temperature: {
    id: 0x0005,
    units: {
      c: 0x01,
      f: 0x02,
      k: 0x03,
    },
    value: valueType.int,
  },
  relativeHumidity: {
    id: 0x0006,
    units: {
      rh: 0x01,
    },
    value: valueType.int,
  },
  luminosity: {
    id: 0x0007,
    units: {
      lm: 0x01,
      cd: 0x02,
      lx: 0x03,
    },
    value: valueType.int,
  },
  time: {
    id: 0x0008,
    units: {
      s: 0x01,
      ms: 0x02,
      us: 0x03,
    },
    value: valueType.int,
  },
  mass: {
    id: 0x0009,
    units: {
      kg: 0x01,
      g: 0x02,
      lb: 0x03,
      oz: 0x04,
    },
    value: valueType.int,
  },
  pressure: {
    id: 0x000a,
    units: {
      pa: 0x01,
      psi: 0x02,
      bar: 0x03,
    },
    value: valueType.int,
  },
  distance: {
    id: 0x000b,
    units: {
      m: 0x01,
      cm: 0x02,
      mi: 0x03,
      in: 0x04,
    },
    value: valueType.int,
  },
  angle: {
    id: 0x000c,
    units: {
      rad: 0x01,
      deg: 0x02,
    },
    value: valueType.float,
  },
  volume: {
    id: 0x000d,
    units: {
      l: 0x01,
      ml: 0x02,
      floz: 0x03,
      gal: 0x04,
    },
    value: valueType.float,
  },
  area: {
    id: 0x000e,
    units: {
      m2: 0x01,
      ha: 0x02,
      ac: 0x03,
    },
    value: valueType.float,
  },
  rain: {
    id: 0x000f,
    units: {
      mm: 0x01,
    },
    value: valueType.float,
  },
  density: {
    id: 0x0010,
    units: {
      kgm3: 0x01,
    },
    value: valueType.float,
  },
  latitude: {
    id: 0x0011,
    units: {
      deg: 0x01,
    },
    value: valueType.float,
  },
  longitude: {
    id: 0x0012,
    units: {
      deg: 0x01,
    },
    value: valueType.float,
  },
  speed: {
    id: 0x0013,
    units: {
      ms: 0x01,
      cms: 0x02,
      kmh: 0x03,
      mih: 0x04,
    },
    value: valueType.int,
  },
  volumeFlow: {
    id: 0x0014,
    units: {
      m3s: 0x01,
      scmm: 0x02,
      ls: 0x03,
      lm: 0x04,
      ft3s: 0x05,
      galm: 0x06,
    },
    value: valueType.float,
  },
  energy: {
    id: 0x0015,
    units: {
      j: 0x01,
      nm: 0x02,
      wh: 0x03,
      kwh: 0x04,
      cal: 0x05,
      kcal: 0x06,
    },
    value: valueType.int,
  },
  presence: {
    id: 0xfff0,
    units: {
      notApplicable: 0x00,
    },
    value: valueType.bool,
  },
  switch: {
    id: 0xfff1,
    units: {
      notApplicable: 0x00,
    },
    value: valueType.bool,
  },
  command: {
    id: 0xfff2,
    units: {
      notApplicable: 0x00,
    },
    value: valueType.raw,
  },
  analog: {
    id: 0xff10,
    units: {
      notApplicable: 0x00,
    },
    value: valueType.int,
  },
  invalid: {
    id: 0xffff,
    units: {
      notApplicable: 0x00,
    },
    value: valueType.invalid,
  },
};
