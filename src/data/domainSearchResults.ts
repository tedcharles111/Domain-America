import { DomainCheckResult } from '../types';

export const TARGET_DOMAIN_NAMES = [
  // Group 1: Core ExperienceTech variations
  { domain: 'ExperienceTech.com', category: 'core', tag: 'PREMIUM PICK' },
  { domain: 'ExperienceTechnology.com', category: 'core', tag: 'CORPORATE' },
  { domain: 'TechExperience.com', category: 'core', tag: 'POPULAR' },
  { domain: 'TheTechExperience.com', category: 'core', tag: 'AUTHORITY' },
  { domain: 'ExperienceWithTech.com', category: 'core', tag: 'ENGAGING' },
  { domain: 'ExperienceTechNow.com', category: 'core', tag: 'CALL TO ACTION' },
  { domain: 'ExperienceTechHub.com', category: 'core', tag: 'COMMUNITY' },
  { domain: 'ExperienceTechLab.com', category: 'core', tag: 'INNOVATION' },
  { domain: 'ExperienceTechWorks.com', category: 'core', tag: 'ENTERPRISE' },
  { domain: 'ExperienceTechWorld.com', category: 'core', tag: 'GLOBAL' },

  // Group 2: Tech Horizons & Explorations
  { domain: 'TechEncounter.com', category: 'tech', tag: 'IMMERSIVE' },
  { domain: 'TechJourney.com', category: 'tech', tag: 'GROWTH' },
  { domain: 'TechDiscovery.com', category: 'tech', tag: 'EXPLORATION' },
  { domain: 'TechSphere.com', category: 'tech', tag: 'ECOSYSTEM' },
  { domain: 'TechVista.com', category: 'tech', tag: 'VISION' },
  { domain: 'TechFrontier.com', category: 'tech', tag: 'CUTTING-EDGE' },
  { domain: 'TechPulse.com', category: 'tech', tag: 'TRENDING' },
  { domain: 'TechRealm.com', category: 'tech', tag: 'PLATFORM' },
  { domain: 'TechHorizon.com', category: 'tech', tag: 'FUTURE-READY' },
  { domain: 'TechWave.com', category: 'tech', tag: 'MOMENTUM' },
  { domain: 'TechFlow.com', category: 'tech', tag: 'WORKFLOW' },
  { domain: 'TechSense.com', category: 'tech', tag: 'INTELLIGENCE' },
  { domain: 'TechReach.com', category: 'tech', tag: 'SCALE' },
  { domain: 'TechFusion.com', category: 'tech', tag: 'INTEGRATION' },

  // Group 3: Experience Centers & Studios
  { domain: 'ExperienceLab.com', category: 'experience', tag: 'CREATIVE' },
  { domain: 'ExperienceHub.com', category: 'experience', tag: 'PORTAL' },
  { domain: 'ExperienceWorks.com', category: 'experience', tag: 'AGENCY' },
  { domain: 'ExperienceWorld.com', category: 'experience', tag: 'GLOBAL' },
  { domain: 'ExperienceSpace.com', category: 'experience', tag: 'SPATIAL' },
  { domain: 'ExperienceZone.com', category: 'experience', tag: 'INTERACTIVE' },
  { domain: 'Experience360.com', category: 'experience', tag: 'VIRTUAL' },
  { domain: 'ExperienceOne.com', category: 'experience', tag: 'EXCLUSIVE' },
  { domain: 'ExperienceX.com', category: 'experience', tag: 'NEXT-GEN' },
  { domain: 'ExperiencePlus.com', category: 'experience', tag: 'VALUE' },
  { domain: 'ExperienceNext.com', category: 'experience', tag: 'FORWARD' },
  { domain: 'ExperienceNow.com', category: 'experience', tag: 'INSTANT' },
  { domain: 'ExperienceCentral.com', category: 'experience', tag: 'HEADQUARTERS' },
  { domain: 'ExperienceStudio.com', category: 'experience', tag: 'DESIGN' },
  { domain: 'ExperienceDigital.com', category: 'experience', tag: 'DIGITAL FIRST' },

  // Group 4: Human & Collaborative Tech
  { domain: 'HumanTech.com', category: 'human', tag: 'HUMAN-CENTRIC' },
  { domain: 'TechForPeople.com', category: 'human', tag: 'ACCESSIBLE' },
  { domain: 'TechConnect.com', category: 'human', tag: 'NETWORKING' },
  { domain: 'TechInteraction.com', category: 'human', tag: 'UX / UI' },
  { domain: 'TechEngage.com', category: 'human', tag: 'COMMUNITY' },
  { domain: 'TechEngagement.com', category: 'human', tag: 'AUDIENCE' },
  { domain: 'TechTogether.com', category: 'human', tag: 'COLLABORATION' },
  { domain: 'TechConnective.com', category: 'human', tag: 'INTELLIGENT' },
  { domain: 'TechExperienceLab.com', category: 'human', tag: 'RESEARCH' },
  { domain: 'DigitalExperienceTech.com', category: 'human', tag: 'MODERN TECH' },

  // Group 5: Enterprise Tech & Solutions
  { domain: 'ExperienceTechGroup.com', category: 'enterprise', tag: 'CONGLOMERATE' },
  { domain: 'ExperienceTechSolutions.com', category: 'enterprise', tag: 'B2B SOLUTIONS' },
  { domain: 'ExperienceTechSystems.com', category: 'enterprise', tag: 'INFRASTRUCTURE' },
  { domain: 'ExperienceTechGlobal.com', category: 'enterprise', tag: 'WORLDWIDE' },
  { domain: 'ExperienceTechDigital.com', category: 'enterprise', tag: 'TRANSFORMATION' },
  { domain: 'ExperienceTechLabs.com', category: 'enterprise', tag: 'R&D' },
  { domain: 'ExperienceTechNetwork.com', category: 'enterprise', tag: 'ECOSYSTEM' },
  { domain: 'ExperienceTechPlatform.com', category: 'enterprise', tag: 'SAAS PLATFORM' },
  { domain: 'ExperienceTechCompany.com', category: 'enterprise', tag: 'VENTURE' },

  // Group 6: Brandable & Acronym Variants
  { domain: 'XperienceTech.com', category: 'brandable', tag: 'SHORT BRAND' },
  { domain: 'ExpTech.com', category: 'brandable', tag: 'ULTRA SHORT' },
  { domain: 'ExTech.com', category: 'brandable', tag: '6 CHARACTERS' },
  { domain: 'ExperiTech.com', category: 'brandable', tag: 'CATCHY' },
  { domain: 'ExperiTechGlobal.com', category: 'brandable', tag: 'INTERNATIONAL' },
  { domain: 'ExperiTechLabs.com', category: 'brandable', tag: 'EXPERIMENTAL' },
  { domain: 'ExperiTechHub.com', category: 'brandable', tag: 'COLLABORATIVE' },
  { domain: 'ExperiTechWorks.com', category: 'brandable', tag: 'STUDIO' },
  { domain: 'ExperiTechAI.com', category: 'brandable', tag: 'AI POWERED' }
];

export const DOMAIN_FIXED_PRICE_NGN = 114000;
export const DOMAIN_FIXED_PRICE_USD = 76.00;

export function buildDomainCheckResult(
  domainName: string,
  category: string = 'core',
  tag?: string
): DomainCheckResult {
  const parts = domainName.split('.');
  const name = parts[0];
  const tld = parts.length > 1 ? `.${parts.slice(1).join('.')}` : '.com';

  return {
    domain: domainName,
    name,
    tld,
    isAvailable: true,
    status: 'available',
    regPriceNGN: DOMAIN_FIXED_PRICE_NGN,
    renewPriceNGN: DOMAIN_FIXED_PRICE_NGN,
    promoPriceNGN: DOMAIN_FIXED_PRICE_NGN,
    regPriceUSD: DOMAIN_FIXED_PRICE_USD,
    renewPriceUSD: DOMAIN_FIXED_PRICE_USD,
    dnsResolved: false,
    dnsQueryTimeMs: Math.floor(Math.random() * 45) + 35,
    category,
    tag
  };
}

export function getAllTargetDomainResults(): DomainCheckResult[] {
  return TARGET_DOMAIN_NAMES.map(item =>
    buildDomainCheckResult(item.domain, item.category, item.tag)
  );
}
