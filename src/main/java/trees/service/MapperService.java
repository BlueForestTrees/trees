package trees.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trees.domain.dto.link.RootCreatedDTO;
import trees.domain.dto.link.RootCreationDTO;
import trees.domain.dto.tree.RootDTO;
import trees.domain.dto.tree.TrunkCreationDTO;
import trees.domain.dto.tree.TrunkDTO;
import trees.domain.dto.tree.TrunkHeaderDTO;
import trees.domain.graph.Link;
import trees.domain.graph.Node;
import trees.repository.ThingRepository;

import java.util.ArrayList;
import java.util.List;

import static java.util.Objects.nonNull;
import static java.util.stream.Collectors.toList;
import static java.util.stream.StreamSupport.stream;

@Service
class MapperService {

    private final ThingRepository thingRepository;

    @Autowired
    public MapperService(final ThingRepository thingRepository) {
        this.thingRepository = thingRepository;
    }

    @Autowired
    private UnitService unitService;

    List<TrunkHeaderDTO> toTrunkHeaderList(final Iterable<Node> nodes) {
        return stream(nodes.spliterator(), false)
                .map(this::toTrunkHeader)
                .collect(toList());
    }

    TrunkDTO toTrunkDTO(final Node node){
        return toTrunkDTO(node, node.getQt());
    }

    private TrunkDTO toTrunkDTO(final Node node, final double qt) {
        final TrunkDTO trunkDTO = TrunkDTO.builder()
                .header(TrunkHeaderDTO.builder()
                        .qt(qt)
                        .name(node.getName())
                        .id(node.getId())
                        .displayUnit(node.getDisplayUnit())
                        .build()
                ).build();

        if (nonNull(node.getLinks())) {
            trunkDTO.setRoots(new ArrayList<>());
            node.getLinks().forEach(
                    link -> trunkDTO.getRoots().add(toRootDTO(link, qt))
            );
        }
        return trunkDTO;
    }

    private RootDTO toRootDTO(final Link link, final double parentQt) {
        final double qt = link.getQt() / (link.getTrunk().getQt() / parentQt);
        final TrunkDTO root = toTrunkDTO(link.getRoot(), qt);
        root.getHeader().setDisplayUnit(link.getDisplayUnit());
        return RootDTO.builder()
                .rootId(link.getId())
                .root(root)
                .build();
    }

    Node toNode(final TrunkCreationDTO trunkCreationDTO) {
        return Node.builder()
                .name(trunkCreationDTO.getName())
                .qt(trunkCreationDTO.getQt())
                .displayUnit(trunkCreationDTO.getDisplayUnit())
                .build();
    }

    Link toLink(final RootCreationDTO rootCreationDTO) {
        final Node trunk = thingRepository.find(rootCreationDTO.getTrunkId());
        final Node root = thingRepository.find(rootCreationDTO.getRootId());
        final double qt = rootCreationDTO.getRootQt() * (trunk.getQt() / rootCreationDTO.getTrunkQt());

        return Link.builder()
                .qt(qt)
                .trunk(trunk)
                .root(root)
                .displayUnit(rootCreationDTO.getDisplayUnit())
                .build();
    }

    RootCreatedDTO toRootCreated(final RootCreationDTO rootCreationDTO, final Link link) {
        final TrunkDTO root = toTrunkDTO(link.getRoot());
        root.getHeader().setDisplayUnit(link.getDisplayUnit());
        requantify(root, rootCreationDTO.getRootQt());

        return RootCreatedDTO.builder()
                .id(link.getId())
                .root(root)
                .build();
    }

    private void requantify(final TrunkDTO tree, final Double qt) {
        final Double coef = tree.getHeader().getQt() / qt;
        tree.getHeader().setQt(tree.getHeader().getQt() / coef);
        applyOnAll(coef, tree.getRoots());
    }

    private void applyOnAll(final Double coef, final List<RootDTO> roots) {
        if (nonNull(roots)) {
            roots.forEach(rootDTO -> {
                rootDTO.getRoot().getHeader().setQt(rootDTO.getRoot().getHeader().getQt() / coef);
                applyOnAll(coef, rootDTO.getRoot().getRoots());
            });
        }
    }

    private TrunkHeaderDTO toTrunkHeader(final Node node) {
        return TrunkHeaderDTO.builder()
                .qt(node.getQt())
                .name(node.getName())
                .id(node.getId())
                .displayUnit(node.getDisplayUnit())
                .build();
    }

    public TrunkDTO toRequantifiedTrunkDTO(final Node node, final double qt, final String unitShortName) {
        final TrunkDTO trunkDTO = toTrunkDTO(node);
        requantify(trunkDTO, unitService.toReference(qt, unitShortName));
        trunkDTO.getHeader().setDisplayUnit(unitShortName);
        return trunkDTO;
    }
}
