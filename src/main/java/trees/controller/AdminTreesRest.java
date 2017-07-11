package trees.controller;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import org.neo4j.ogm.model.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import trees.repository.AdminRepository;

@Controller
@RequestMapping(value = "/adminapi")
public class AdminTreesRest {

    @Autowired
    private AdminRepository adminRepository;

    @RequestMapping(value = "/delete/all", method = GET)
    @ResponseBody
    Result deleteAll() {
        return adminRepository.deleteAll();
    }

    @RequestMapping(value = "/list/all", method = GET)
    @ResponseBody
    Result listAll() {
        return adminRepository.listAll();
    }
}
