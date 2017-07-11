package trees.service;

import org.neo4j.ogm.session.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import trees.domain.dto.link.RootCreatedDTO;
import trees.domain.dto.link.RootCreationDTO;
import trees.domain.graph.Link;
import trees.repository.LinkRepository;

@Service
public class RootService {

    @Autowired
    private LinkRepository linkRepository;

    @Autowired
    private MapperService mapperService;

    @Autowired
    private ValidationService validationService;

    @Autowired
    protected Session session;

    public void delete(final Long id) {
        linkRepository.delete(id);
    }

    public RootCreatedDTO create(final RootCreationDTO rootCreationDTO) {

        validationService.validateBranchCreation(rootCreationDTO);

        session.clear();

        final Link link = mapperService.toLink(rootCreationDTO);
        final Link savedLink = linkRepository.createOrUpdate(link);
        return mapperService.toRootCreated(rootCreationDTO, savedLink);
    }
}
