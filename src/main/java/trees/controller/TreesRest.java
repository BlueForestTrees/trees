package trees.controller;

import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import trees.domain.dto.link.RootCreatedDTO;
import trees.domain.dto.link.RootCreationDTO;
import trees.domain.dto.tree.TrunkCreationDTO;
import trees.domain.dto.tree.TrunkDTO;
import trees.domain.dto.tree.TrunkHeaderDTO;
import trees.domain.unit.Unit;
import trees.service.RootService;
import trees.service.TreeService;
import trees.service.UnitService;

@Controller
@RequestMapping(value = "/api")
public class TreesRest {

    @Autowired
    private RootService rootService;
    @Autowired
    private TreeService treeService;
    @Autowired
    private UnitService unitService;

    @RequestMapping(value = "/trunk", method = POST)
    @ResponseBody
    TrunkDTO createTrunk(@RequestBody final TrunkCreationDTO trunkCreationDTO) {
        return treeService.create(trunkCreationDTO);
    }

    @RequestMapping(value = "/root", method = POST)
    @ResponseBody
    RootCreatedDTO createRoot(@RequestBody final RootCreationDTO rootCreationDTO) {
        return rootService.create(rootCreationDTO);
    }

    @RequestMapping(value = "/root/{id}", method = DELETE)
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    void deleteRoot(@PathVariable Long id) {
        rootService.delete(id);
    }

    @RequestMapping(value = "/trunk/{id}", method = DELETE)
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    void deleteTrunk(@PathVariable Long id) {
        treeService.delete(id);
    }


    @RequestMapping(value = "/trunkHeadersList/namePart/{namePart}", method = GET)
    @ResponseBody
    List<TrunkHeaderDTO> listTrunkHeaderByNamePart(@PathVariable String namePart) {
        return treeService.listTrunkHeaders(namePart);
    }

    @RequestMapping(value = "/trunkHeadersList", method = GET)
    @ResponseBody
    List<TrunkHeaderDTO> listAllTrunkHeaders() {
        return treeService.listAll();
    }

    @RequestMapping(value = "/trunk/{id}", method = GET)
    @ResponseBody
    TrunkDTO getTrunk(@PathVariable Long id) {
        return treeService.getTrunk(id);
    }

    @RequestMapping(value = "/units", method = GET)
    @ResponseBody
    Map<String,Unit> units() {
        return unitService.getAll();
    }

    @RequestMapping(value = "/requantifiedTrunk/{id}/{qt}/{unitShortName}", method = GET)
    @ResponseBody
    TrunkDTO requantifiedTrunk(@PathVariable long id, @PathVariable double qt, @PathVariable String unitShortName) {
        return treeService.getRequantifiedTrunk(id, qt, unitShortName);
    }

}
