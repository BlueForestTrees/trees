package trees.exception;

import trees.domain.dto.link.RootCreationDTO;

public class RecursiveLinkCreationException extends RuntimeException {

    public RecursiveLinkCreationException(final RootCreationDTO linkDto) {
        super("Can't create a recursive link: " + linkDto.toString());
    }

}
