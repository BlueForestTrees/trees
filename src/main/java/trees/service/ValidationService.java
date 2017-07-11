package trees.service;

import static java.util.Objects.isNull;

import org.springframework.stereotype.Service;

import trees.domain.dto.link.RootCreationDTO;
import trees.exception.MissingValueLinkCreationException;
import trees.exception.RecursiveLinkCreationException;

@Service
public class ValidationService {

    public void validateBranchCreation(final RootCreationDTO linkDto) {

        if (isNull(linkDto.getTrunkId())) {
            throw new MissingValueLinkCreationException("trunkId", linkDto);
        }

        if (isNull(linkDto.getRootId())) {
            throw new MissingValueLinkCreationException("rootId", linkDto);
        }

        if (isNull(linkDto.getRootQt())) {
            throw new MissingValueLinkCreationException("rootQt", linkDto);
        }

        if (isNull(linkDto.getTrunkQt())) {
            throw new MissingValueLinkCreationException("trunkQt", linkDto);
        }

        if (isNull(linkDto.getDisplayUnit())) {
            throw new MissingValueLinkCreationException("displayUnit", linkDto);
        }

        if (linkDto.getTrunkId() == linkDto.getRootId()) {
            throw new RecursiveLinkCreationException(linkDto);
        }
    }

}
