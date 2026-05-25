import { NextRequest, NextResponse } from 'next/server';
import * as Astro from 'astronomy-engine';

export const dynamic = 'force-dynamic';

const ZODIAC_SIGNS = [
  { name: 'Aries', symbol: '♈' },
  { name: 'Taurus', symbol: '♉' },
  { name: 'Gemini', symbol: '♊' },
  { name: 'Cancer', symbol: '♋' },
  { name: 'Leo', symbol: '♌' },
  { name: 'Virgo', symbol: '♍' },
  { name: 'Libra', symbol: '♎' },
  { name: 'Scorpio', symbol: '♏' },
  { name: 'Sagittarius', symbol: '♐' },
  { name: 'Capricorn', symbol: '♑' },
  { name: 'Aquarius', symbol: '♒' },
  { name: 'Pisces', symbol: '♓' }
];

function getZodiacSign(longitude: number) {
  const index = Math.floor(longitude / 30) % 12;
  return ZODIAC_SIGNS[index];
}

function getPlanetLongitude(bodyKey: string, time: Astro.AstroTime): number {
  if (bodyKey === 'sun') {
    return Astro.SunPosition(time).elon;
  }
  if (bodyKey === 'moon') {
    return Astro.EclipticGeoMoon(time).lon;
  }
  
  // Format bodyKey to match Astro.Body enum (e.g. 'mercury' -> 'Mercury')
  const bodyName = bodyKey.charAt(0).toUpperCase() + bodyKey.slice(1);
  const bodyEnum = (Astro.Body as any)[bodyName];
  
  if (!bodyEnum) {
    throw new Error(`Unknown celestial body: ${bodyKey}`);
  }
  
  const vector = Astro.GeoVector(bodyEnum, time, true);
  const ecliptic = Astro.Ecliptic(vector);
  return ecliptic.elon;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get('date');
    const date = dateStr ? new Date(dateStr) : new Date();

    if (isNaN(date.getTime())) {
      return NextResponse.json({ error: 'Invalid date parameter' }, { status: 400 });
    }

    const timeCurrent = Astro.MakeTime(date);
    // Use 1 hour difference for derivative speed calculations
    const timeNext = Astro.MakeTime(new Date(date.getTime() + 1000 * 60 * 60));

    const planetKeys = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
    
    const planetsData: Record<string, any> = {};

    planetKeys.forEach(key => {
      const lonCurrent = getPlanetLongitude(key, timeCurrent);
      const lonNext = getPlanetLongitude(key, timeNext);

      // Handle longitude wrapping at 360/0
      let diff = lonNext - lonCurrent;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;

      const speedDegPerDay = diff * 24;
      const retrograde = diff < 0;
      const signInfo = getZodiacSign(lonCurrent);

      planetsData[key] = {
        name: key.charAt(0).toUpperCase() + key.slice(1),
        longitude: Number(lonCurrent.toFixed(4)),
        sign: signInfo.name,
        symbol: signInfo.symbol,
        speed: Number(speedDegPerDay.toFixed(6)),
        retrograde: retrograde
      };
    });

    return NextResponse.json({
      timestamp: date.toISOString(),
      planets: planetsData
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
