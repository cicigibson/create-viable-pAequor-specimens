// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  
  const pAequorFactory = (specimenNum, dna) => {
    return {
      specimenNum,
      dna,
      //Select a random base within the DNA and change it to a new base
      mutate() {
        let newDna = dna
        randIdx = Math.floor(Math.random() * 15)
        randBase = returnRandBase();
        while (randBase == newDna[randIdx]) {
          randBase = returnRandBase()
        }
        newDna[randIdx] = randBase
        return newDna
      },
      //Compare this strand to a second strand to see how much DNA they have in common
      compareDNA(compStrand) {
        let numCommon = 0;
        for (idx in this.dna) {
          if (this.dna[idx] == compStrand.dna[idx]) {
            numCommon++
          } else {
            continue
          }
        }
        return `specimen #1 and specimen #2 have ${((numCommon/15) * 100).toFixed()}% DNA in common`
      },
      // P. aequor have a likelier chance of survival if their DNA is made up of at least 60% 'C' or 'G' bases.
      // Check chance of survival
      willLikelySurvive() {
        filterCGBases = this.dna.filter(base => base == 'C' || base == 'G')
        percentCGBases = filterCGBases.length/this.dna.length;
        if (percentCGBases > .6){
          return true
        }
        return false
      }
    }
  }
  
  //Generate viable specimens
  const createViableStrand = () => {
    newStrand = pAequorFactory(1, mockUpStrand(returnRandBase));
    if (newStrand.willLikelySurvive() == false) {
      createViableStrand()     
    } 
    return newStrand.dna;
  }
  
  //Generate an array of 30 viable specimens
  let thirtyViableSpecimens = []
  while (thirtyViableSpecimens.length < 30){
    thirtyViableSpecimens.push(createViableStrand())
  }
  
  //TESTS
  //Should create a test strand of 15 dna bases
  const testStrand1 = pAequorFactory(1, mockUpStrand(returnRandBase))
  console.log('Test Strand 1: ' + testStrand1.dna)
  //Should produce a different test strand of 15 dna bases
  const testStrand2 = pAequorFactory(1, mockUpStrand(returnRandBase))
  console.log('Test Strand 2: ' + testStrand2.dna)
  //Should compare percentage of DNA two strands have in common
  console.log(testStrand1.compareDNA(testStrand2))
  //Should return true if percentage of C and G bases in testStrand1 > 60% and false if < 60%
  console.log('Is Test Strand 1 Viable? ' + testStrand1.willLikelySurvive())
  //Should return a viable strand of DNA
  console.log('Viable specimen:')
  console.log(createViableStrand())
  //Should create 30 viable specimens
  console.log('30 Viable Specimens: ')
  console.log(thirtyViableSpecimens)