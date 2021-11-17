import { xhr } from '../XHR';

class BuilderAdapter {
  getGenerations() {
    return xhr.getPokeApiJson('/generation');
  }

  getGeneration(endpoint: string) {
    return xhr.getPokeApiJson('/generation/' + endpoint);
  }

  getPokedex(endpoint: string) {
    return xhr.getPokeApiJson('/pokedex/' + endpoint);
  }

  getTypes() {
    return xhr.getPokeApiJson('/type').then((json) => json.results);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveListSelectPokemon(selectPokemon: any) {
    return xhr.postJson('/builder', selectPokemon);
  }

  deleteListSelectPokemon(id: number) {
    return xhr.delete('/builder/' + id);
  }

  getSelectPokemon(endpoint: string) {
    return xhr.getJson('/builder/' + endpoint);
  }
}

export const builder = new BuilderAdapter();
