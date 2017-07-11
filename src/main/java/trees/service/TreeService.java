package trees.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import trees.domain.dto.tree.TrunkHeaderDTO;
import trees.domain.graph.Node;
import trees.domain.dto.tree.TrunkCreationDTO;
import trees.domain.dto.tree.TrunkDTO;
import trees.repository.ThingRepository;

import java.util.List;

@Service
public class TreeService {

    @Autowired
    private ThingRepository thingRepository;
    @Autowired
    private MapperService mapperService;

    public TrunkDTO create(final TrunkCreationDTO trunkCreationDTO) {
        final Node node = mapperService.toNode(trunkCreationDTO);
        final Node createdOrUpdatedNode = thingRepository.createOrUpdate(node);
        return mapperService.toTrunkDTO(createdOrUpdatedNode);
    }

    public void delete(final Long id) {
        thingRepository.delete(id);
    }

    public List<TrunkHeaderDTO> listTrunkHeaders(final String namePart) {
        final String searchTerm = ".*" + namePart + ".*";
        final Iterable<Node> foundNodes = thingRepository.names(searchTerm);
        return mapperService.toTrunkHeaderList(foundNodes);
    }

    public List<TrunkHeaderDTO> listAll() {
        return mapperService.toTrunkHeaderList(thingRepository.findAll());
    }

    public TrunkDTO getTrunk(final Long id) {
        return mapperService.toTrunkDTO(thingRepository.find(id));
    }

    public TrunkDTO getRequantifiedTrunk(final long id, final double qt, final String unitShortName) {
        return mapperService.toRequantifiedTrunkDTO(thingRepository.find(id), qt, unitShortName);
    }
}
